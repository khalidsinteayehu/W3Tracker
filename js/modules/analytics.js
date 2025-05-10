/* File: /js/modules/analytics.js */

import DOMPurify from 'dompurify';

const Analytics = (() => { function drawHeatmap(canvas, dataByDate) { const ctx = canvas.getContext('2d'); const cellSize = 14; const padding = 2; const colors = ['#e0f7fa', '#b2ebf2', '#4dd0e1', '#00bcd4', '#0097a7'];

const dates = Object.keys(dataByDate).sort();
const max = Math.max(...Object.values(dataByDate));

ctx.clearRect(0, 0, canvas.width, canvas.height);
dates.forEach((date, index) => {
  const count = dataByDate[date];
    const intensity = Math.min(Math.floor((count / max) * colors.length), colors.length - 1);
      ctx.fillStyle = colors[intensity];
        const x = (index % 30) * (cellSize + padding);
          const y = Math.floor(index / 30) * (cellSize + padding);
            ctx.fillRect(x, y, cellSize, cellSize);
            });

            }

            function drawPieChart(svgElement, data) { const total = Object.values(data).reduce((sum, val) => sum + val, 0); let offset = 0; let index = 0; svgElement.innerHTML = ''; const colors = ['#ff9800', '#4caf50', '#2196f3', '#e91e63'];

            for (let key in data) {
              const value = data[key];
                const percent = value / total;
                  const angle = percent * 360;
                    const largeArc = angle > 180 ? 1 : 0;

                      const x = Math.cos(2 * Math.PI * (offset + percent) - Math.PI / 2);
                        const y = Math.sin(2 * Math.PI * (offset + percent) - Math.PI / 2);

                          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                            const d = `M 50 50 L ${50 + 50 * Math.cos(2 * Math.PI * offset - Math.PI / 2)} ${50 + 50 * Math.sin(2 * Math.PI * offset - Math.PI / 2)} A 50 50 0 ${largeArc} 1 ${50 + 50 * x} ${50 + 50 * y} Z`;
                              path.setAttribute('d', d);
                                path.setAttribute('fill', colors[index % colors.length]);
                                  path.setAttribute('data-label', DOMPurify.sanitize(key));
                                    svgElement.appendChild(path);

                                      offset += percent;
                                        index++;
                                        }

                                        }

                                        function drawBarChart(canvas, data) { const ctx = canvas.getContext('2d'); const labels = Object.keys(data); const values = Object.values(data); const max = Math.max(...values);

                                        const width = canvas.width;
                                        const height = canvas.height;
                                        const barWidth = width / labels.length - 10;

                                        ctx.clearRect(0, 0, width, height);
                                        labels.forEach((label, i) => {
                                          const val = values[i];
                                            const barHeight = (val / max) * (height - 20);
                                              ctx.fillStyle = '#4caf50';
                                                ctx.fillRect(i * (barWidth + 10), height - barHeight, barWidth, barHeight);
                                                  ctx.fillStyle = '#000';
                                                    ctx.font = '10px sans-serif';
                                                      ctx.fillText(label, i * (barWidth + 10), height - 5);
                                                      });

                                                      }

                                                      return { drawHeatmap, drawPieChart, drawBarChart, }; })();

                                                      export default Analytics;

                                                      