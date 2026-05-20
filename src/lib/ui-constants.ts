export const YELLOW = "hsl(var(--primary))";

export const NO_MISSIONS_ERROR = "[ERRO]: Nenhuma missão registrada nos arquivos.";

export const getSkillColor = (value: number): string => {
  if (value >= 90) return "#00f0ff";
  if (value >= 75) return "#00ff73";
  if (value >= 50) return "#ffae00";
  return "#ff3366";
};
