# Trading simulator price data

Builds the real-price dataset embedded in `../opensource-everything-preview.html` (`SIMDATA`).

1. `python3 fetch.py`: downloads daily closes (split and bonus adjusted) from Yahoo Finance
   for the Nifty 50 index, NIFTYBEES, GOLDBEES and 15 large NSE stocks, from 2007 to a cutoff
   3 months before the build date (set `p2` in the script).
2. `python3 build.py`: aligns everything to Nifty trading days, fixes the ETF bad ticks
   around their unit splits (Dec 2019) and two NIFTYBEES glitches in 2010, and writes
   `simdata.json` (delta-encoded paise, base 36).

Preview only. For launch, prices need a licensed source (NSE data licence or a licensed
vendor); Yahoo's terms don't allow redistribution.
