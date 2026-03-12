const API_URL = 'http://localhost:8000/api/v1';

export const recommendSchemes = async (userProfile) => {
  try {
    const response = await fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    });
    if (!response.ok) throw new Error('Failed to fetch recommendations');
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchSchemeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/scheme/${id}`);
    if (!response.ok) throw new Error('Scheme not found');
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
