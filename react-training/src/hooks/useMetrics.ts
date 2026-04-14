import { useState, useEffect } from 'react'

export interface Metrics {
    cpu    : number
    memory : number
    reqsSec: number
    ts     : number
}

export function useMetrics() {
    const [metrics, setMetrics] = useState<Metrics[] | null>(null)
    const [error,   setError  ] = useState<string   | null>(null)
    const metricsLength = 30;


    useEffect(() => {
        let metricsArray: Metrics[] = [];
        for(let i = 0; i < metricsLength; i++) {
            metricsArray.push({
                cpu    : 0,
                memory : 0,
                reqsSec: 0,
                ts     : 0
            })
        }
        let newMetrics: Metrics[] = [];
        const es = new EventSource('/v1/metrics')

        es.onmessage = (e: MessageEvent) => {
            const newMetric = e?.data ? JSON.parse(e.data) : null;
            if (newMetric) {
                setMetrics(prev => {
                    const updated = [...(prev ?? []), newMetric];
                    console.info(updated,'updated')
                    return prev ? metricsArray.splice(4, 1, newMetric) : metricsArray;                 
                });
            }
            if(metricsArray.length > metricsLength) {
                newMetrics = [];
            }
        }

        es.onerror = () => {
            setError('Connection to metrics stream lost.')
            newMetrics = []
            es.close()
        }

        return () => {
            es.close()
        }
    }, [])

    return { metrics, error }
}
