
document.addEventListener("DOMContentLoaded", async () => {
    await HMIG_getAllAssets()
    document.getElementById("loading_text").style.display = "none"
    HMIG_layout()
})
