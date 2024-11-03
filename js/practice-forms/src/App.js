import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    date: '',
    text: 'USD' // Set the default currency code here
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert date to 'yyyymmdd' format
      const dateFormatted = formData.date.replace(/-/g, '');

      // make sure the currecy is upper case
      const currencyCode = formData.text.toUpperCase();
      const apiUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currencyCode}&date=${dateFormatted}&json`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No data available for the selected date and currency code.');
      }
      const { rate, exchangedate } = data[0];

      const resultData = {
        rate,
        exchangedate,
        requestedDate: formData.date,
        currencyCode: currencyCode // Include currency code in results
      };

      setResults(resultData);
      setIsExpanded(true);
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
      setResults(null);
      setIsExpanded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 pt-4 pb-3">
              <h4 className="card-title text-center mb-0 fw-bold text-primary">Exchange Rate Form</h4>
            </div>
            <div className="card-body px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="date" className="form-label fw-semibold">Date</label>
                  <input
                    type="date"
                    className="form-control form-control-lg border-2"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '8px', fontSize: '1rem', padding: '0.75rem' }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="text" className="form-label fw-semibold">Currency Code</label>
                  <input
                    type="text"
                    className="form-control form-control-lg border-2"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Enter currency code (e.g., USD)"
                    required
                    style={{ borderRadius: '8px', fontSize: '1rem', padding: '0.75rem' }}
                  />
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                    style={{
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Collapsible Results */}
          {results && (
            <div className={`collapse ${isExpanded ? 'show' : ''}`}>
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fw-bold text-success">Results</h5>
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="card-body px-4 py-4">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th scope="row" className="ps-0">Currency Code:</th>
                          <td className="pe-0">{results.currencyCode}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="ps-0">Requested Date:</th>
                          <td className="pe-0">{results.requestedDate}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="ps-0">Exchange Date:</th>
                          <td className="pe-0">{results.exchangedate}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="ps-0">Exchange Rate:</th>
                          <td className="pe-0">{results.rate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
