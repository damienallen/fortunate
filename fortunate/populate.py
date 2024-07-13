import httpx
import base64
from pathlib import Path
from fortunate.models import create_epigram, init_db
from tqdm import tqdm

import logging

logging.getLogger("sqlalchemy.engine.Engine").disabled = True

GH_USER = "shlomif"
GH_REPO = "fortune-mod"
BRANCH = "master"


def collect_fortuntes():
    """
    Collect dat files from fortune-mod
    https://github.com/shlomif/fortune-mod
    """

    tree_resp = httpx.get(
        f"https://api.github.com/repos/{GH_USER}/{GH_REPO}/git/trees/{BRANCH}?recursive=1"
    )
    tree_resp.raise_for_status()
    tree = tree_resp.json()["tree"]

    for item in tree:
        item_path = Path(item["path"])

        # Skip other files and directories
        if (
            "datfiles" not in item["path"]
            or not item["type"] == "blob"
            or not len(item_path.parts) == 3
            or item_path.suffix
        ):
            continue

        category = item_path.parts[-1]
        blob_resp = httpx.get(item["url"])
        blob_resp.raise_for_status()

        decoded_bytes = base64.b64decode(blob_resp.json()["content"])
        epigrams = decoded_bytes.decode("utf-8").replace("\t", "").split("\n%\n")

        for epigram in tqdm(
            epigrams,
            desc=category,
        ):
            create_epigram(text=epigram, category=category)


if __name__ == "__main__":
    init_db()
    collect_fortuntes()
