const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/yahtzee';


export async function startNewGame() {
    const response = await fetch(`${BASE_URL}/new-game`, { method: 'POST' });
    return await response.json();
}

export async function rollAll() {
    const res = await fetch(`${BASE_URL}/roll-all`, { method: 'POST' });
    return await res.json();
}

export async function reroll(indices) {
    const res = await fetch(`${BASE_URL}/reroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(indices),
    });
    return await res.json();
}