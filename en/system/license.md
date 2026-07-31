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

---

## License Validity & Renewal

TestNet license files include an expiration date. After expiration, the system enters read-only mode (you can still view assets and history, but cannot create new tasks or execute workflows).

- **Check Expiry**: View the current license expiration date on the "**License Management**" page.
- **Renal Process**: Before expiration, repeat Steps 1–3 above to obtain and upload a new license file. The update takes effect immediately without downtime.
- **Expiration Reminders**: The system sends notifications via the Notification Center 7 days before license expiration.

::: tip Test Environments
In test environments, license verification can be disabled by setting `testnet.license.enabled=false` for automated testing.
:::

---

## Docker Deployment & Machine ID Stability

License files are bound to the server's machine ID. In Docker deployments, container recreation (e.g., `docker compose down && up`) may cause the machine ID to change, invalidating the license.

**Solution**: Mount the host machine ID file (read-only) in `docker-compose.yml` for the server container to ensure a stable machine ID across rebuilds:

```yaml
services:
  testnet-server:
    volumes:
      - /etc/machine-id:/etc/machine-id:ro
```

::: warning Important
Without this mount, each container rebuild generates a new machine ID, invalidating the existing license. You would need to obtain a new license.
:::

---

## FAQ

### License upload shows "Machine ID mismatch"

- Verify the uploaded license corresponds to the **current server's** machine ID
- For Docker environments, confirm `/etc/machine-id` is mounted as described above
- If server hardware changes (e.g., motherboard or NIC replacement), the machine ID will change and a new license is required

### License has expired

- After expiration, the system enters read-only mode. Existing assets and task records are unaffected
- Follow the activation process above to obtain and upload a new license to restore full functionality

### Do multiple nodes require multiple licenses?

- **Server License**: Each server instance requires its own license file (bound to its machine ID)
- **Scanning Nodes**: Client nodes do not require individual licenses; they are managed by the server

---

## Related Documentation

- [System Setup & Activation](/en/deploy/overview) — Machine ID mount and deployment configuration
- [FAQ](/en/guide/faq) — Deployment troubleshooting