Here is the updated GitHub description, rewritten to highlight all the new features, safeguards, and logging capabilities we added to the script.

<h1 align="center">


Steam License Remover



<a href="https://ibb.co/D55WXk5"><img src="https://i.ibb.co/LnnRw6n/Sans-titre-modified.png" alt="Sans-titre-modified" border="0"></a>



Version: 2.0


</h1>

Description
This script automatically removes any "Free" games, old demos, or expired trials from your Steam Library by revoking the game's license from your account. This cleans up your library so these titles no longer appear.

The updated version is built for reliability, featuring automatic rate-limit handling, automatic page re-scanning, readable title extraction, and a downloadable activity log.

Features
Smart Rate-Limit Protection: Automatically detects Steam's "Too Many Requests" (429) errors and pauses for 15 seconds before resuming.

Auto-Rescanning: Continues to scan and loop through the page until every single free license is caught and removed.

Failsafe Kill-Switch: Automatically aborts the process if it fails 5 times in a row to protect your account from temporary IP bans.

Readable Console Output: Decodes Steam's Base64 game titles so you can actually read the names of the games being removed in real-time.

Automatic Log Export: Generates and downloads a .txt log file of all removed games when the process completes or safely aborts.

Usage
Copy the script to your clipboard.

Open your browser and log into your Steam account.

Go to: https://store.steampowered.com/account/licenses/

Open the Developer Console (Press F12, or Ctrl + Shift + J / Cmd + Option + J).

Paste the script into the console and press Enter. (Note: Your browser may ask you to type "allow pasting" first).

Wait for the script to finish. A text file containing your removal log will automatically download.

Refresh the page to see the changes. (You may need to do a hard refresh by pressing CTRL + F5).

Notes
This script will not remove any games that you have purchased with real money.

This script will not remove any games that you have been gifted or activated via CD key.

Warning regarding "Free to Keep" promotions: If you claimed a temporarily free game, and Steam categorized it as a Free-to-Play license rather than a Store Purchase, this script will remove it. If you have promotional games you want to keep, check your licenses page manually first. If there is a "Remove" button next to it, the script will click it.

Disclaimer
This script is provided as is. I am not responsible for any damage that may occur to your account or lost game licenses. Use at your own risk.

Do not drastically change the script's internal interval times. If you do, your browser's access to your profile settings page may be temporarily blocked by Steam.

Changelog
2.0 - Added automatic page re-scanning, rate-limit pausing (15s), failsafe kill-switch (5 consecutive errors), Base64 title decoding, and automatic .txt log file generation.

1.1 - Added a delay between each request to avoid being blocked by Steam.

1.0 - Initial Release.

Credits
SteamDB - https://steamdb.info/

IroN404 (Original Author)

Beardox (Fork Commission)
