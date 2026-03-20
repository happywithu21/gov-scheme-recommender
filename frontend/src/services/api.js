// API base URL — set VITE_API_URL in Vercel to point at the Render backend.
// Falls back to localhost:8000 for local development.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const recommendSchemes = async (userProfile) => {
  try {
    const response = await fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    });
    
    if (!response.ok) {
      throw new Error(`[Recommend API] HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Recommend API failed.", error.message);
    throw error;
  }
};

export const fetchAllSchemes = async (filters = {}, skip = 0, limit = 20) => {
  try {
    const params = new URLSearchParams({ skip, limit });
    
    // Append any active filters dynamically
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.state && filters.state !== 'All India') params.append('state', filters.state);
    if (filters.gender && filters.gender !== 'All') params.append('gender', filters.gender);
    if (filters.income_max !== undefined && filters.income_max < 1000000) {
      params.append('income_max', filters.income_max);
    }

    const endpoint = `${API_URL}/schemes?${params.toString()}`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`[Schemes API] HTTP Error: ${response.status} at ${endpoint}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("❌ Fetch All Schemes API failed.", error.message);
    // Return empty fallback structure so UI doesn't crash completely
    return { status: "error", total: 0, data: [] };
  }
};

export const fetchSchemeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/scheme/${id}`);
    if (!response.ok) {
      throw new Error(`[Scheme Detail API] HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Fetch Scheme ID ${id} failed.`, error.message);
    return null;
  }
};
