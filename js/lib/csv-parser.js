/* File: /js/lib/csv-parser.js */

// Web Worker for parsing CSV files safely
self.onmessage = function (e) {
  const { fileText, delimiter = "," } = e.data;
    try {
        const rows = fileText.split("\n").filter(Boolean);
            const headers = rows.shift().split(delimiter).map(h => h.trim());

                const data = rows.map(row => {
                      const values = row.split(delimiter).map(v => v.trim());
                            const entry = {};
                                  headers.forEach((h, i) => {
                                          entry[h] = values[i] || "";
                                                });
                                                      return entry;
                                                          });

                                                              self.postMessage({ success: true, data });
                                                                } catch (error) {
                                                                    self.postMessage({ success: false, error: error.message });
                                                                      }
                                                                      };