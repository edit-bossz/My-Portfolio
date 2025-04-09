import imaplib
import email
import re
from email.utils import parsedate_to_datetime
from datetime import timezone, timedelta

# Gmail login credentials
username = "editprime7@gmail.com"
password = "igpv qzhj nvhe lyud"  # Your app password here

# Connect to Gmail's IMAP server
mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login(username, password)

# Select the "All Mail" folder (use "[Gmail]/All Mail" if emails might be archived)
mail.select('"[Gmail]/All Mail"')

# Search for emails with the label "IPs"
result, data = mail.search(None, 'X-GM-LABELS "IPs"')
print("Search result:", result)
email_ids = data[0].split()
print("Email count found:", len(email_ids))

# Regular expression to extract the IP address from the email's body.
ip_regex = re.compile(r"Visitor's IP Address:\s*([\d.]+)")

with open("output_ips.txt", "w", encoding="utf-8") as outfile:
    for e_id in email_ids:
        # Fetch the email message by ID.
        result, message_data = mail.fetch(e_id, "(RFC822)")
        raw_email = message_data[0][1]
        msg = email.message_from_bytes(raw_email)
        
        # Extract the date from the email header.
        # The 'Date' header is usually provided in a format like "Sat, 16 Nov 2024 13:02:30 +0000"
        email_date_str = msg.get("Date", None)
        if email_date_str:
            try:
                dt = parsedate_to_datetime(email_date_str)
                # Convert to IST (UTC +5:30)
                ist_tz = timezone(timedelta(hours=5, minutes=30))
                ist_dt = dt.astimezone(ist_tz)
                formatted_time = ist_dt.strftime("%B %d, %Y at %I:%M:%S %p (%A)")
            except Exception as dt_err:
                print("Error parsing date:", dt_err)
                formatted_time = "N/A"
        else:
            formatted_time = "N/A"
        
        # Extract plain text content from the email body.
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    charset = part.get_content_charset()
                    try:
                        body += part.get_payload(decode=True).decode(charset if charset else "utf-8")
                    except Exception as decode_err:
                        print(f"Decoding error: {decode_err}")
        else:
            charset = msg.get_content_charset()
            try:
                body = msg.get_payload(decode=True).decode(charset if charset else "utf-8")
            except Exception as decode_err:
                print(f"Decoding error: {decode_err}")

        # Use regex to search for the IP address.
        match = ip_regex.search(body)
        if match:
            ip_address = match.group(1)
            outfile.write(f"IP: {ip_address} | Time: {formatted_time}\n")
        else:
            print("No IP found in email ID:", e_id)

# Logout from the Gmail server.
mail.logout()
print("Finished. Check output_ips.txt for IP addresses with time stamps.")
