
export async function getQuestions() {
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")

    if (!response.ok) {
        throw {
            message: "Failed to fetch",
            status: response.status,
            statusText: response.statusText
        }
    }

    try {
        const data = await response.json()
        return data.results
    }
    catch(err) {
        return { error: err }
    }
}
