/**
 * Registry of supported event ontologies and their mappings
 */
class OntologyRegistry {
    static ONTOLOGIES = {
        HEO: {
            relationships: ['causes', 'effects', 'participates_in'],
            eventTypes: ['historical', 'causal', 'participatory']
        },
        EVENT_ONTOLOGY: {
            relationships: ['sub_event', 'parallel_event', 'sequential_event'],
            properties: ['duration', 'frequency', 'scale']
        }
    };
}

/**
 * Event type definitions with severity levels
 */
class EventType {
    static TYPES = {
        INCIDENT: 'Incident',
        GATHERING: 'Gathering',
        ANNOUNCEMENT: 'Announcement',
        CRISIS: 'Crisis'
    };

    static SEVERITY = {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3,
        CRITICAL: 4
    };
}

/**
 * Pattern matching rules for event analysis
 */
class PatternRegistry {
    constructor() {
        this.patterns = {
            temporal: {
                absolute: /\d{1,2}:\d{2}/,
                relative: /(today|yesterday|tomorrow|tonight)/i,
                date: /\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/
            },
            location: {
                city: /in ([A-Z][a-z]+(?: [A-Z][a-z]+)*)/,
                address: /at ([0-9]+(?:[A-Za-z]*)? [A-Z][a-z]+ (?:St|Ave|Rd|Blvd|Lane|Drive|Circle|Square))/i
            },
            entity: {
                person: /@([A-Za-z0-9_]+)/,
                organization: /([A-Z][a-z]+ (?:Inc|Corp|LLC|Ltd|Organization|Association))/,
                hashtag: /#([A-Za-z0-9_]+)/
            }
        };

        this.keywords = {
            [EventType.TYPES.INCIDENT]: ['happened', 'occurred', 'reported'],
            [EventType.TYPES.GATHERING]: ['protest', 'meeting', 'assembly'],
            [EventType.TYPES.ANNOUNCEMENT]: ['announced', 'declared', 'stated'],
            [EventType.TYPES.CRISIS]: ['emergency', 'crisis', 'disaster']
        };
    }
}

/**
 * Event analyzer with ontology support
 */
class EventAnalyzer {
    constructor() {
        this.registry = new PatternRegistry();
    }

    async analyzeTweet(tweetText) {
        const event = {
            text: tweetText,
            type: this.classifyEventType(tweetText),
            time: this.extractTime(tweetText),
            place: this.extractLocations(tweetText),
            entities: this.extractEntities(tweetText),
            relations: [],
            confidence: 0,
            severity: EventType.SEVERITY.MEDIUM
        };

        event.confidence = this.calculateConfidence(event);
        return event;
    }

    classifyEventType(text) {
        const matches = {};
        for (const [type, keywords] of Object.entries(this.registry.keywords)) {
            matches[type] = keywords.filter(keyword => 
                text.toLowerCase().includes(keyword.toLowerCase())).length;
        }
        return _.maxBy(Object.entries(matches), '[1]')?.[0] || EventType.TYPES.INCIDENT;
    }

    extractTime(text) {
        const results = [];
        const patterns = this.registry.patterns.temporal;

        for (const [type, pattern] of Object.entries(patterns)) {
            const match = text.match(pattern);
            if (match) {
                results.push({ type, value: match[0] });
            }
        }
        return results;
    }

    extractLocations(text) {
        const results = [];
        const patterns = this.registry.patterns.location;

        for (const [type, pattern] of Object.entries(patterns)) {
            const match = text.match(pattern);
            if (match) {
                results.push({ type, value: match[1] });
            }
        }
        return results;
    }

    extractEntities(text) {
        const results = [];
        const patterns = this.registry.patterns.entity;

        for (const [type, pattern] of Object.entries(patterns)) {
            const matches = Array.from(text.matchAll(new RegExp(pattern, 'g')));
            for (const match of matches) {
                results.push({
                    type,
                    value: match[1],
                    position: match.index
                });
            }
        }
        return results;
    }

    calculateConfidence(event) {
        let score = 0;
        if (event.time?.length) score += 0.3;
        if (event.place?.length) score += 0.3;
        if (event.entities?.length) score += 0.2;
        return Math.min(score, 1);
    }
}

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
            result.innerHTML = JSON.stringify(analysis, null, 2);
        } catch (error) {
            result.innerHTML = `Error: ${error.message}`;
        }
    };
};

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
