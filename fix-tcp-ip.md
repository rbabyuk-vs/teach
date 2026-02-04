Yes, definitely try those commands! Since disabling the firewall didn't help, it really does sound like a TCP/IP stack configuration issue.

**Here's the order I'd recommend:**

1. **First, try the simplest fix - reset TCP/IP and Winsock:**
   ```cmd
   netsh int ip reset
   netsh winsock reset
   ```
   Then restart and test.

2. **If that doesn't work, try the MTU adjustment:**
   ```cmd
   # First check your interface name
   netsh interface ipv4 show interfaces
   
   # Then set MTU (replace "Ethernet" or "Wi-Fi" with your actual interface name)
   netsh interface ipv4 set subinterface "Ethernet" mtu=1400 store=persistent
   ```
   Restart and test.

3. **If still failing, try disabling auto-tuning:**
   ```cmd
   netsh interface tcp set global autotuninglevel=disabled
   netsh int tcp set global chimney=disabled
   ```
   Restart and test.

**Important notes:**
- Run all commands in Command Prompt **as Administrator**
- Restart your computer after each set of changes
- If something makes it worse, you can revert:
  - MTU: `netsh interface ipv4 set subinterface "YourInterface" mtu=1500 store=persistent`
  - Auto-tuning: `netsh interface tcp set global autotuninglevel=normal`

Let me know what happens! If these don't work, we might need to look at router settings or try using WSL (Windows Subsystem for Linux) as a workaround for the Arduino development.
