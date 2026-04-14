// Smooth random walk: nudges the value by a small random delta each tick,
// and clamps it within [min, max] so it stays credible over time.
function walk(current, min, max, step) {
    const next = current + (Math.random() * 2 - 1) * step;
    return Math.round(Math.min(max, Math.max(min, next)) * 10) / 10;
}

exports.stream = (req, res) => {
    res.setHeader('Content-Type',  'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection',    'keep-alive');
    res.flushHeaders();

    // Starting values
    let cpu     = 35;
    let memory  = 52;
    let reqsSec = 28;

    const interval = setInterval(() => {
        cpu     = walk(cpu,     5,  95, 4);
        memory  = walk(memory,  30, 90, 2);
        reqsSec = walk(reqsSec, 1,  120, 8);

        const payload = {
            cpu     : cpu,
            memory  : memory,
            reqsSec : reqsSec,
            ts      : Date.now()
        };

        res.write(`data: ${JSON.stringify(payload)}\n\n`);
    }, 1000);

    req.on('close', () => clearInterval(interval));
};
