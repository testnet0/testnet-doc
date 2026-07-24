---
title: License Management
description: Follow WeChat Official Account "Anlian Security" (暗链安全) to obtain license and activate the system
---

# License Management

TestNet production environment requires a valid license file. Please follow the steps below to quickly obtain and activate the system:

## Step 1: Obtain Machine ID

1. After platform deployment, log in using the administrator account.
2. Go to the left menu: "**System Management**" → "**License Management**".
3. Copy the **Machine ID** displayed on the page (computed based on server hardware).

## Step 2: Follow WeChat Official Account to Get License

1. Search and follow the WeChat Official Account: "**Anlian Security**" (暗链安全).
2. Send your copied Machine ID directly in the chat box (format: `machine-id: <YOUR_MACHINE_ID>` or just send the ID string directly).
3. The chatbot will automatically verify and reply in real-time with the generated license content (JSON format).
4. Create a new local text file named `license.lic`, copy the full JSON content from the WeChat reply, and paste it into the file.

## Step 3: Activate in Web Interface

1. Go back to TestNet's "**System Management**" → "**License Management**" page.
2. Click the "**Upload License File**" button.
3. Select your local `license.lic` file and click upload.
4. The system will instantly verify and activate the license!