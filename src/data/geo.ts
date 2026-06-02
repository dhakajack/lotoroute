export type GeoNode = {
  code: string;
  latitude: number;
  longitude: number;
  population: number;
  neighbors: string[];
};

type GeoNodeInput = Omit<GeoNode, "code">;

const DEPARTMENT_GEO: Record<string, GeoNodeInput> = {
  "01": { latitude: 46.1415, longitude: 5.4499, population: 679344, neighbors: ["38", "39", "69", "71", "73", "74"] },
  "02": { latitude: 49.4777, longitude: 3.4804, population: 523342, neighbors: ["08", "51", "59", "60", "77", "80"] },
  "03": { latitude: 46.3707, longitude: 3.1491, population: 333298, neighbors: ["18", "23", "42", "58", "63", "71"] },
  "04": { latitude: 44.1521, longitude: 6.3143, population: 168054, neighbors: ["05", "06", "26", "83", "84"] },
  "05": { latitude: 44.6482, longitude: 6.207, population: 143467, neighbors: ["04", "26", "38", "73"] },
  "06": { latitude: 43.898, longitude: 7.1052, population: 1128418, neighbors: ["04", "2A", "2B", "83"] },
  "07": { latitude: 44.773, longitude: 4.3548, population: 334231, neighbors: ["26", "30", "38", "42", "43", "48", "84"] },
  "08": { latitude: 49.6464, longitude: 4.7283, population: 265893, neighbors: ["02", "51", "55"] },
  "09": { latitude: 42.9551, longitude: 1.5043, population: 155722, neighbors: ["11", "31", "66"] },
  "10": { latitude: 48.2987, longitude: 4.1208, population: 310447, neighbors: ["21", "51", "52", "77", "89"] },
  "11": { latitude: 43.1504, longitude: 2.3081, population: 379648, neighbors: ["09", "31", "34", "66", "81"] },
  "12": { latitude: 44.2951, longitude: 2.6406, population: 279609, neighbors: ["15", "30", "34", "46", "48", "81", "82"] },
  "13": { latitude: 43.4425, longitude: 5.1505, population: 2087658, neighbors: ["2A", "2B", "30", "83", "84"] },
  "14": { latitude: 49.0521, longitude: -0.4188, population: 709441, neighbors: ["27", "50", "61"] },
  "15": { latitude: 45.0273, longitude: 2.7109, population: 144196, neighbors: ["12", "19", "43", "46", "48", "63"] },
  "16": { latitude: 45.7334, longitude: 0.2283, population: 352683, neighbors: ["17", "24", "79", "86", "87"] },
  "17": { latitude: 45.8116, longitude: -0.7284, population: 672279, neighbors: ["16", "24", "33", "79", "85"] },
  "18": { latitude: 47.0137, longitude: 2.4006, population: 298660, neighbors: ["03", "23", "36", "41", "45", "58"] },
  "19": { latitude: 45.3693, longitude: 1.8969, population: 240826, neighbors: ["15", "23", "24", "46", "63", "87"] },
  "2A": { latitude: 41.8396, longitude: 8.9396, population: 168306, neighbors: ["06", "13", "2B", "83", "I"] },
  "2B": { latitude: 42.4916, longitude: 9.1344, population: 187180, neighbors: ["06", "13", "2A", "83", "I"] },
  "21": { latitude: 47.4285, longitude: 4.7468, population: 540100, neighbors: ["10", "39", "52", "58", "70", "71", "89"] },
  "22": { latitude: 48.522, longitude: -2.8861, population: 611859, neighbors: ["29", "35", "56"] },
  "23": { latitude: 46.0669, longitude: 1.9523, population: 115527, neighbors: ["03", "18", "19", "36", "63", "87"] },
  "24": { latitude: 45.1288, longitude: 0.753, population: 417614, neighbors: ["16", "17", "19", "33", "46", "47", "87"] },
  "25": { latitude: 47.2014, longitude: 6.3214, population: 547163, neighbors: ["39", "70", "90"] },
  "26": { latitude: 44.6262, longitude: 5.2423, population: 524207, neighbors: ["04", "05", "07", "38", "84"] },
  "27": { latitude: 49.1294, longitude: 1.0249, population: 602714, neighbors: ["14", "28", "60", "61", "76", "78", "95"] },
  "28": { latitude: 48.4165, longitude: 1.3385, population: 433129, neighbors: ["27", "41", "45", "61", "72", "78", "91"] },
  "29": { latitude: 48.2569, longitude: -4.2089, population: 933455, neighbors: ["22", "56"] },
  "30": { latitude: 44.0288, longitude: 4.0051, population: 770940, neighbors: ["07", "12", "13", "34", "48", "84"] },
  "31": { latitude: 43.3328, longitude: 1.1722, population: 1471468, neighbors: ["09", "11", "32", "65", "81", "82"] },
  "32": { latitude: 43.7083, longitude: 0.4461, population: 192645, neighbors: ["31", "40", "47", "64", "65", "82"] },
  "33": { latitude: 44.8047, longitude: -0.4843, population: 1690493, neighbors: ["17", "24", "40", "47"] },
  "34": { latitude: 43.6097, longitude: 3.2675, population: 1230289, neighbors: ["11", "12", "30", "81"] },
  "35": { latitude: 48.2148, longitude: -1.7495, population: 1120666, neighbors: ["22", "44", "49", "50", "53", "56"] },
  "36": { latitude: 46.7455, longitude: 1.598, population: 216069, neighbors: ["18", "23", "37", "41", "86", "87"] },
  "37": { latitude: 47.26, longitude: 0.6752, population: 619362, neighbors: ["36", "41", "49", "72", "86"] },
  "38": { latitude: 45.2619, longitude: 5.5913, population: 1298990, neighbors: ["01", "05", "07", "26", "42", "69", "73"] },
  "39": { latitude: 46.7836, longitude: 5.6113, population: 257973, neighbors: ["01", "21", "25", "70", "71"] },
  "40": { latitude: 43.8296, longitude: -0.6223, population: 433570, neighbors: ["32", "33", "47", "64"] },
  "41": { latitude: 47.6757, longitude: 1.3669, population: 328543, neighbors: ["18", "28", "36", "37", "45", "72"] },
  "42": { latitude: 45.7294, longitude: 4.2006, population: 774133, neighbors: ["03", "07", "38", "43", "63", "69", "71"] },
  "43": { latitude: 45.1522, longitude: 3.7899, population: 228654, neighbors: ["07", "15", "42", "48", "63"] },
  "44": { latitude: 47.3078, longitude: -1.6737, population: 1487570, neighbors: ["35", "49", "56", "85"] },
  "45": { latitude: 47.9203, longitude: 2.3546, population: 691268, neighbors: ["18", "28", "41", "58", "77", "89", "91"] },
  "46": { latitude: 44.6008, longitude: 1.6009, population: 176473, neighbors: ["12", "15", "19", "24", "47", "82"] },
  "47": { latitude: 44.3903, longitude: 0.5058, population: 333602, neighbors: ["24", "32", "33", "40", "46", "82"] },
  "48": { latitude: 44.525, longitude: 3.53, population: 76486, neighbors: ["07", "12", "15", "30", "43"] },
  "49": { latitude: 47.3905, longitude: -0.6563, population: 833776, neighbors: ["35", "37", "44", "53", "72", "79", "85", "86"] },
  "50": { latitude: 49.0521, longitude: -1.3253, population: 497522, neighbors: ["14", "35", "53", "61"] },
  "51": { latitude: 48.9148, longitude: 4.248, population: 563076, neighbors: ["02", "08", "10", "52", "55", "77"] },
  "52": { latitude: 48.1165, longitude: 5.2024, population: 168331, neighbors: ["10", "21", "51", "55", "70", "88"] },
  "53": { latitude: 48.1605, longitude: -0.6418, population: 305468, neighbors: ["35", "49", "50", "61", "72"] },
  "54": { latitude: 48.8933, longitude: 6.0974, population: 732236, neighbors: ["55", "57", "67", "88"] },
  "55": { latitude: 49.0531, longitude: 5.3889, population: 180290, neighbors: ["08", "51", "52", "54", "88"] },
  "56": { latitude: 47.7127, longitude: -2.9118, population: 783390, neighbors: ["22", "29", "35", "44"] },
  "57": { latitude: 49.0423, longitude: 6.6911, population: 1051309, neighbors: ["54", "67"] },
  "58": { latitude: 47.1362, longitude: 3.6323, population: 201417, neighbors: ["03", "18", "21", "45", "71", "89"] },
  "59": { latitude: 50.4571, longitude: 3.1679, population: 2615635, neighbors: ["02", "62", "80"] },
  "60": { latitude: 49.4072, longitude: 2.4841, population: 829899, neighbors: ["02", "27", "76", "77", "80", "95"] },
  "61": { latitude: 48.5909, longitude: 0.0568, population: 275201, neighbors: ["14", "27", "28", "50", "53", "72"] },
  "62": { latitude: 50.3962, longitude: 2.4765, population: 1457905, neighbors: ["59", "80", "GB", "UK"] },
  "63": { latitude: 45.7229, longitude: 3.121, population: 664453, neighbors: ["03", "15", "19", "23", "42", "43"] },
  "64": { latitude: 43.2857, longitude: -0.7464, population: 706564, neighbors: ["32", "40", "65"] },
  "65": { latitude: 43.1399, longitude: 0.1504, population: 231349, neighbors: ["31", "32", "64"] },
  "66": { latitude: 42.541, longitude: 2.4831, population: 496855, neighbors: ["09", "11"] },
  "67": { latitude: 48.7303, longitude: 7.4202, population: 1163810, neighbors: ["54", "57", "68", "88"] },
  "68": { latitude: 47.8263, longitude: 7.2179, population: 770738, neighbors: ["67", "88", "90"] },
  "69": { latitude: 45.8855, longitude: 4.6277, population: 1914667, neighbors: ["01", "38", "42", "71"] },
  "70": { latitude: 47.6025, longitude: 6.0274, population: 233185, neighbors: ["21", "25", "39", "52", "88", "90"] },
  "71": { latitude: 46.6609, longitude: 4.5888, population: 550310, neighbors: ["01", "03", "21", "39", "42", "58", "69"] },
  "72": { latitude: 48.0056, longitude: 0.2158, population: 566733, neighbors: ["28", "37", "41", "49", "53", "61"] },
  "73": { latitude: 45.4928, longitude: 6.3966, population: 448226, neighbors: ["01", "05", "38", "74"] },
  "74": { latitude: 46.0131, longitude: 6.4615, population: 861158, neighbors: ["01", "73"] },
  "75": { latitude: 48.8488, longitude: 2.3633, population: 2103778, neighbors: ["92", "93", "94"] },
  "76": { latitude: 49.588, longitude: 1.166, population: 1260964, neighbors: ["27", "60", "80"] },
  "77": { latitude: 48.6269, longitude: 2.9461, population: 1468108, neighbors: ["02", "10", "45", "51", "60", "89", "91", "93", "94", "95"] },
  "78": { latitude: 48.8031, longitude: 1.8381, population: 1485086, neighbors: ["27", "28", "91", "92", "95"] },
  "79": { latitude: 46.5689, longitude: -0.3356, population: 375229, neighbors: ["16", "17", "49", "85", "86"] },
  "80": { latitude: 49.9639, longitude: 2.3815, population: 565413, neighbors: ["02", "59", "60", "62", "76"] },
  "81": { latitude: 43.7961, longitude: 2.1786, population: 397352, neighbors: ["11", "12", "31", "34", "82"] },
  "82": { latitude: 44.1175, longitude: 1.3193, population: 265817, neighbors: ["12", "31", "32", "46", "47", "81"] },
  "83": { latitude: 43.3325, longitude: 6.2536, population: 1119307, neighbors: ["04", "06", "13", "2A", "2B", "84"] },
  "84": { latitude: 44.1064, longitude: 5.1634, population: 572056, neighbors: ["04", "07", "13", "26", "30", "83"] },
  "85": { latitude: 46.7425, longitude: -1.3536, population: 713609, neighbors: ["17", "44", "49", "79"] },
  "86": { latitude: 46.5611, longitude: 0.4204, population: 438897, neighbors: ["16", "36", "37", "49", "79", "87"] },
  "87": { latitude: 45.8988, longitude: 1.2525, population: 373167, neighbors: ["16", "19", "23", "24", "36", "86"] },
  "88": { latitude: 48.224, longitude: 6.2964, population: 357248, neighbors: ["52", "54", "55", "67", "68", "70", "90"] },
  "89": { latitude: 47.8172, longitude: 3.6241, population: 332267, neighbors: ["10", "21", "45", "58", "77"] },
  "90": { latitude: 47.6112, longitude: 6.9442, population: 140255, neighbors: ["25", "68", "70", "88"] },
  "91": { latitude: 48.5212, longitude: 2.2354, population: 1338485, neighbors: ["28", "45", "77", "78", "92", "94"] },
  "92": { latitude: 48.8301, longitude: 2.2486, population: 1654712, neighbors: ["75", "78", "91", "93", "94", "95"] },
  "93": { latitude: 48.9178, longitude: 2.4909, population: 1704316, neighbors: ["75", "77", "92", "94", "95"] },
  "94": { latitude: 48.7768, longitude: 2.4789, population: 1426929, neighbors: ["75", "77", "91", "92", "93"] },
  "95": { latitude: 49.0953, longitude: 2.0863, population: 1281653, neighbors: ["27", "60", "77", "78", "92", "93"] }
};

const COUNTRY_GEO: Record<string, GeoNodeInput> = {
  A: { latitude: 48.2082, longitude: 16.3738, population: 9150000, neighbors: ["CZ", "D", "FL", "H", "I", "CH", "SK", "SLO"] },
  AND: { latitude: 42.5063, longitude: 1.5218, population: 85000, neighbors: ["09", "66", "E"] },
  B: { latitude: 50.8503, longitude: 4.3517, population: 11700000, neighbors: ["08", "59", "62", "D", "L", "NL"] },
  BG: { latitude: 42.6977, longitude: 23.3219, population: 6450000, neighbors: ["GR", "RO"] },
  CH: { latitude: 46.948, longitude: 7.4474, population: 9000000, neighbors: ["01", "25", "39", "68", "74", "A", "D", "FL", "I"] },
  CY: { latitude: 35.1856, longitude: 33.3823, population: 1260000, neighbors: ["GR"] },
  CZ: { latitude: 50.0755, longitude: 14.4378, population: 10900000, neighbors: ["A", "D", "PL", "SK"] },
  D: { latitude: 52.52, longitude: 13.405, population: 83500000, neighbors: ["57", "67", "68", "A", "B", "CH", "CZ", "DK", "L", "NL", "PL"] },
  DK: { latitude: 55.6761, longitude: 12.5683, population: 5960000, neighbors: ["D", "IS", "S"] },
  E: { latitude: 40.4168, longitude: -3.7038, population: 48600000, neighbors: ["09", "64", "65", "66", "AND", "P"] },
  EST: { latitude: 59.437, longitude: 24.7536, population: 1370000, neighbors: ["FIN", "LV"] },
  FIN: { latitude: 60.1699, longitude: 24.9384, population: 5600000, neighbors: ["EST", "N", "S"] },
  FL: { latitude: 47.141, longitude: 9.5209, population: 40000, neighbors: ["A", "CH"] },
  GB: { latitude: 51.5072, longitude: -0.1276, population: 68300000, neighbors: ["62", "IRL", "UK"] },
  GR: { latitude: 37.9838, longitude: 23.7275, population: 10400000, neighbors: ["BG", "CY"] },
  H: { latitude: 47.4979, longitude: 19.0402, population: 9600000, neighbors: ["A", "HR", "RO", "SK", "SLO"] },
  HR: { latitude: 45.815, longitude: 15.9819, population: 3860000, neighbors: ["H", "SLO"] },
  I: { latitude: 41.9028, longitude: 12.4964, population: 58900000, neighbors: ["04", "05", "06", "2A", "2B", "73", "74", "A", "CH", "M", "MC", "RSM", "SLO", "V"] },
  IRL: { latitude: 53.3498, longitude: -6.2603, population: 5300000, neighbors: ["GB", "UK"] },
  IS: { latitude: 64.1466, longitude: -21.9426, population: 390000, neighbors: ["DK"] },
  L: { latitude: 49.6116, longitude: 6.1319, population: 670000, neighbors: ["54", "57", "B", "D"] },
  LT: { latitude: 54.6872, longitude: 25.2797, population: 2900000, neighbors: ["LV", "PL"] },
  LV: { latitude: 56.9496, longitude: 24.1052, population: 1880000, neighbors: ["EST", "LT"] },
  M: { latitude: 35.8997, longitude: 14.5146, population: 540000, neighbors: ["I"] },
  MC: { latitude: 43.7384, longitude: 7.4246, population: 39000, neighbors: ["06", "I"] },
  N: { latitude: 59.9139, longitude: 10.7522, population: 5550000, neighbors: ["FIN", "S"] },
  NL: { latitude: 52.3676, longitude: 4.9041, population: 17900000, neighbors: ["B", "D"] },
  P: { latitude: 38.7223, longitude: -9.1393, population: 10600000, neighbors: ["E"] },
  PL: { latitude: 52.2297, longitude: 21.0122, population: 37600000, neighbors: ["CZ", "D", "LT", "SK"] },
  RO: { latitude: 44.4268, longitude: 26.1025, population: 19000000, neighbors: ["BG", "H"] },
  RSM: { latitude: 43.9424, longitude: 12.4578, population: 34000, neighbors: ["I"] },
  S: { latitude: 59.3293, longitude: 18.0686, population: 10500000, neighbors: ["DK", "FIN", "N"] },
  SK: { latitude: 48.1486, longitude: 17.1077, population: 5420000, neighbors: ["A", "CZ", "H", "PL"] },
  SLO: { latitude: 46.0569, longitude: 14.5058, population: 2100000, neighbors: ["A", "H", "HR", "I"] },
  UK: { latitude: 51.5072, longitude: -0.1276, population: 68300000, neighbors: ["62", "GB", "IRL"] },
  V: { latitude: 41.9029, longitude: 12.4534, population: 800, neighbors: ["I"] }
};

export const GEO_NODES: Record<string, GeoNode> = Object.fromEntries(
  Object.entries({ ...DEPARTMENT_GEO, ...COUNTRY_GEO }).map(([code, node]) => [
    code,
    {
      ...node,
      code,
      neighbors: [...new Set(node.neighbors)].sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
    }
  ])
);

export function getGeoNode(code: string): GeoNode | null {
  return GEO_NODES[normalizeLocationCode(code)] ?? null;
}

export function getKnownLocationCodes(): string[] {
  return Object.keys(GEO_NODES);
}

export function isKnownLocationCode(code: string): boolean {
  return Boolean(getGeoNode(code));
}

export function normalizeLocationCode(code: string): string {
  return code.trim().toUpperCase();
}

export function findNearestLocationCode(latitude: number, longitude: number): string {
  let nearest = GEO_NODES["75"];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const node of Object.values(GEO_NODES)) {
    const distance = haversineKm(latitude, longitude, node.latitude, node.longitude);
    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  }

  return nearest.code;
}

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const rLat1 = toRadians(lat1);
  const rLat2 = toRadians(lat2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
