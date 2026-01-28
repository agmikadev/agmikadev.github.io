// Configuração das Métricas Pessoais
const METRICS = [
  { label: "LANG :: ENGLISH", value: "90%", display: "C1", color: "#a9fc03" }, // Verde Neon
  { label: "ATTR :: LOGIC", value: "95%", display: "HI", color: "#61dafb" }, // Ciano React
  { label: "ATTR :: CREATIVE", value: "85%", display: "HI", color: "#ff0055" }, // Rosa Cyber
];

export const TelemetryStats = () => {
  return (
    <div className="telemetry-wrapper">
      {/* Divisor Interno */}
      <div className="telemetry-divider"></div>

      {/* 2. PERSONAL METRICS (Bars) */}
      <div className="metrics-col">
        {METRICS.map((metric) => (
          <div key={metric.label} className="metric-item">
            <div className="metric-header">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-val-text" style={{ color: metric.color }}>
                {metric.display}
              </span>
            </div>

            <div className="metric-track">
              <div
                className="metric-fill"
                style={{
                  width: metric.value,
                  backgroundColor: metric.color,
                  boxShadow: `0 0 8px ${metric.color}`,
                }}
              />
              {/* Segmentação visual da barra (efeito grade) */}
              <div className="metric-grid-overlay"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
