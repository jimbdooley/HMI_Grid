
function HMIG_get(url, time_limit_ms = 5000) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      reject(`Get error: "${url}" after ${time_limit_ms} ms`);
    }, time_limit_ms);

    fetch(url, { signal: controller.signal })
      .then(response => {
        clearTimeout(timeout);
        if (!response.ok) {
          reject(`Get error: "${url}": ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(resolve)
      .catch(err => {
        clearTimeout(timeout);
        reject(err.name === "AbortError" ? `Request timed out (${time_limit_ms} ms)` : err);
      });
  });
}

function HMIG_post(url, dataStr, time_limit_ms = 5000) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      reject(`Post error: "${url}" after ${time_limit_ms} ms`);
    }, time_limit_ms);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dataStr,
      signal: controller.signal,
    })
      .then(response => {
        clearTimeout(timeout);
        if (!response.ok) {
          reject(`Post error: "${url}": ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(resolve)
      .catch(err => {
        clearTimeout(timeout);
        reject(err.name === "AbortError" ? `Request timed out (${time_limit_ms} ms)` : err);
      });
  });
}

function HMIG_checkForDrawablesAfterDelay(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      let allDone = true
      for (const key in HMIG_state.drawable_assets) {
        allDone &= HMIG_state.drawable_assets[key].complete && HMIG_state.drawable_assets[key].naturalWidth !== 0
      }
      resolve(allDone)
    }, delay)
  })
}

async function HMIG_getAllAssets() {
  HMIG_state.text_assets = JSON.parse(await HMIG_get("get_all_assets"))
  const drawable_files_obj = JSON.parse(await HMIG_get("get_drawable_filenames"))
  for (const drawable_files_key in drawable_files_obj) {
    const drawable_files = drawable_files_obj[drawable_files_key]
    for (let i = 0; i < drawable_files.length; i++) {
        const im = new Image()
        im.src = `drawable/${drawable_files_key}/${drawable_files[i]}`
        HMIG_state.drawable_assets[`${drawable_files_key}/${drawable_files[i]}`] = im
    }
  }

  do {
    HMIG_state.assetsRdy = await HMIG_checkForDrawablesAfterDelay(25)
  } while (!HMIG_state.assetsRdy)
}
