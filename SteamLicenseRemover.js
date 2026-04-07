let removedCount = 0;
let consecutiveFailures = 0;
const MAX_FAILURES = 5;
let activityLog = []; 

function addLogEntry(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logString = `[${timestamp}] ${message}`;
    activityLog.push(logString);
    console.log(logString); 
}

async function removeGame(game) {
    addLogEntry(`Attempting to remove: "${game.name}" (ID: ${game.id})...`);
    try {
        const response = await fetch('https://store.steampowered.com/account/removelicense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `sessionid=${encodeURIComponent(g_sessionID)}&packageid=${encodeURIComponent(game.id)}`
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                removedCount++;
                consecutiveFailures = 0; 
                addLogEntry(`✅ SUCCESS: "${game.name}" removed. Total removed so far: ${removedCount}`);
                return true;
            } else {
                addLogEntry(`❌ FAILED: Steam returned success: false for "${game.name}".`);
            }
        } else {
            addLogEntry(`⚠️ SERVER ERROR for "${game.name}". Status: ${response.status} ${response.statusText}`);
            if (response.status === 429) {
                addLogEntry("⏳ Too many requests! Steam is rate-limiting. Pausing for 15 seconds...");
                await new Promise(resolve => setTimeout(resolve, 15000));
            }
        }
    } catch (error) {
        addLogEntry(`💥 EXCEPTION: Error removing "${game.name}": ${error.message}`);
    }
    
    consecutiveFailures++;
    return false;
}

function getRemovableGames() {
    const links = Array.from(document.querySelectorAll('a[href^="javascript:RemoveFreeLicense"]'));
    return links.map(link => {
        const match = link.href.match(/RemoveFreeLicense\(\s*(\d+)\s*,\s*['"](.*?)['"]\s*\)/);
        if (match) {
            let gameName = match[2];
            try {
                // Decode the Base64 string Steam uses for game titles
                // decodeURIComponent and escape handle special characters like registered trademark symbols
                gameName = decodeURIComponent(escape(atob(gameName))); 
            } catch (e) {
                // If it fails to decode (e.g., Steam stops using Base64), it will just use the raw string
            }
            return { id: match[1], name: gameName };
        }
        
        const idMatch = link.href.match(/RemoveFreeLicense\(\s*(\d+)\s*,/);
        return idMatch ? { id: idMatch[1], name: "Unknown Title" } : null;
    }).filter(game => game !== null);
}

function downloadLogFile() {
    if (activityLog.length === 0) return;
    
    addLogEntry("Generating log file download...");
    const logContent = activityLog.join('\n');
    
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const dateString = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    a.download = `Steam_License_Removal_Log_${dateString}.txt`;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function startRemovalProcess() {
    addLogEntry("🚀 Starting license removal process...");
    
    let games = getRemovableGames();
    
    while (games.length > 0) {
        addLogEntry(`Found ${games.length} games to remove in this pass.`);
        
        for (const game of games) {
            if (consecutiveFailures >= MAX_FAILURES) {
                addLogEntry(`🛑 PROCESS STOPPED: ${MAX_FAILURES} consecutive failures reached. You may be rate-limited.`);
                downloadLogFile();
                return;
            }

            await removeGame(game);
            await new Promise(resolve => setTimeout(resolve, 2000)); 
        }

        addLogEntry("🔄 Pass complete. Re-checking the page for remaining games...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        games = getRemovableGames(); 
    }

    addLogEntry(`🎉 Process complete! No more free licenses found on this page. Total removed: ${removedCount}`);
    downloadLogFile();
}

startRemovalProcess();
