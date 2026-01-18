import { industries, sectors } from "../config/industries";

describe("Industry data integrity", () => {
  it("every industry.sectorId exists in sectors", () => {
    const sectorIds = new Set(sectors.map(s => s.id));
    for (const ind of industries) {
      expect(sectorIds.has(ind.sectorId)).toBe(true);
    }
  });

  it("all industry slugs are unique", () => {
    const slugs = industries.map(i => i.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });
});
