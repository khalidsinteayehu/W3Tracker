/* File: /js/modules/chart-utils.js */

export function drawHeatmap(canvas, data) {
  const ctx = canvas.getContext('2d');
    const months = Object.keys(data).sort();
      const cellSize = 30;
        canvas.width = months.length * cellSize;
          canvas.height = cellSize;

            months.forEach((month, i) => {
                const intensity = Math.min(data[month] * 20, 255);
                    ctx.fillStyle = `rgb(${255 - intensity},${255 - intensity},255)`;
                        ctx.fillRect(i * cellSize, 0, cellSize - 2, cellSize - 2);
                            ctx.fillStyle = '#000';
                                ctx.font = '10px sans-serif';
                                    ctx.fillText(month.slice(5), i * cellSize + 5, cellSize - 5);
                                      });
                                      }

                                      export function drawPie(canvas, data) {
                                        const ctx = canvas.getContext('2d');
                                          const entries = Object.entries(data);
                                            const total = entries.reduce((sum, [, val]) => sum + val, 0);
                                              const colors = ['#58A', '#A85', '#5A8', '#A58', '#888'];
                                                canvas.width = 200;
                                                  canvas.height = 200;

                                                    let start = 0;
                                                      entries.forEach(([label, value], i) => {
                                                          const angle = (value / total) * 2 * Math.PI;
                                                              ctx.beginPath();
                                                                  ctx.moveTo(100, 100);
                                                                      ctx.arc(100, 100, 90, start, start + angle);
                                                                          ctx.closePath();
                                                                              ctx.fillStyle = colors[i % colors.length];
                                                                                  ctx.fill();
                                                                                      start += angle;
                                                                                        });
                                                                                        }

                                                                                        export function drawLineChart(canvas, data) {
                                                                                          const ctx = canvas.getContext('2d');
                                                                                            const w = canvas.width = 300;
                                                                                              const h = canvas.height = 150;
                                                                                                ctx.clearRect(0, 0, w, h);

                                                                                                  ctx.beginPath();
                                                                                                    ctx.moveTo(0, h);
                                                                                                      data.forEach((point, i) => {
                                                                                                          const x = (i / (data.length - 1)) * w;
                                                                                                              const y = h - point.rate * h;
                                                                                                                  ctx.lineTo(x, y);
                                                                                                                    });
                                                                                                                      ctx.strokeStyle = '#58A';
                                                                                                                        ctx.lineWidth = 2;
                                                                                                                          ctx.stroke();

                                                                                                                            data.forEach((point, i) => {
                                                                                                                                const x = (i / (data.length - 1)) * w;
                                                                                                                                    const y = h - point.rate * h;
                                                                                                                                        ctx.fillStyle = '#000';
                                                                                                                                            ctx.fillText(point.name.slice(0, 6), x, h - 5);
                                                                                                                                                ctx.beginPath();
                                                                                                                                                    ctx.arc(x, y, 3, 0, 2 * Math.PI);
                                                                                                                                                        ctx.fill();
                                                                                                                                                          });
                                                                                                                                                          }