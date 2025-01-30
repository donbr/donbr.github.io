// event-analyzer.js
// ... [previous code remains the same until window.onload] ...

// Initialize when the page loads
window.onload = () => {
    const analyzer = new EventAnalyzer();
    const button = document.getElementById('analyzeBtn');
    const input = document.getElementById('tweetInput');
    const result = document.getElementById('result');

    button.onclick = async () => {
        try {
            const tweet = input.value;
            const analysis = await analyzer.analyzeTweet(tweet);
            
            // Format the results for display
            const formattedResult = {
                ...analysis,
                confidence: `${(analysis.confidence * 100).toFixed(1)}%`,
                summary: generateSummary(analysis)
            };
            
            result.innerHTML = JSON.stringify(formattedResult, null, 2);
            result.classList.add('text-sm', 'font-mono');
        } catch (error) {
            result.innerHTML = `Error: ${error.message}`;
            result.classList.add('text-red-600');
        }
    };

    // Helper function to generate a human-readable summary
    function generateSummary(analysis) {
        const parts = [];
        
        if (analysis.type) {
            parts.push(`Type: ${analysis.type}`);
        }
        
        if (analysis.time.length > 0) {
            const times = analysis.time.map(t => t.value).join(', ');
            parts.push(`Time: ${times}`);
        }
        
        if (analysis.place.length > 0) {
            const places = analysis.place.map(p => p.value).join(', ');
            parts.push(`Location: ${places}`);
        }
        
        if (analysis.entities.length > 0) {
            const entities = analysis.entities.map(e => `${e.type}: ${e.value}`).join(', ');
            parts.push(`Entities: ${entities}`);
        }
        
        return parts.join(' | ');
    }

    // Initial analysis on page load
    button.click();
};
