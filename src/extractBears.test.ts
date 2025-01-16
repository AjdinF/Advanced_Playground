import { describe, expect, it, vi, beforeEach } from 'vitest';
import { extractBears } from './extractBears';
import { JSDOM } from 'jsdom';

vi.mock('./fetchImageUrl', () => ({
  fetchImageUrl: vi.fn().mockResolvedValue('https://example.com/bear_image.jpg'),
}));

describe('extractBears', () => {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="more_bears"></div></body></html>`);
    global.document = dom.window.document;
  });

  it('should extract bear data and update the DOM correctly', async () => {
    const mockWikitext = `
      {{Species table/row|name=[[Polar bear]]|binomial=Ursus maritimus|image=polar_bear.jpg|range=Arctic}}
      {{Species table/end}}
    `;

    await extractBears(mockWikitext);

    const moreBearsSection = document.querySelector('.more_bears');
    expect(moreBearsSection?.innerHTML).toContain('Polar bear');
    expect(moreBearsSection?.innerHTML).toContain('Ursus maritimus');
    expect(moreBearsSection?.innerHTML).toContain('https://example.com/bear_image.jpg');
    expect(moreBearsSection?.innerHTML).toContain('Arctic');
  });

  it('should not update the DOM when image is missing', async () => {
    const mockWikitext = `
      {{Species table/row|name=[[Grizzly bear]]|binomial=Ursus arctos|range=North America}}
      {{Species table/end}}
    `;

    await extractBears(mockWikitext);

    const moreBearsSection = document.querySelector('.more_bears');
    expect(moreBearsSection?.innerHTML).toBe('');
  });
});
