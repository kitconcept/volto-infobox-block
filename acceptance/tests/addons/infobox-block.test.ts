import { expectNoAccessibilityViolations } from '../accessibility';
import { addBlockFromSlashMenu, save } from '../blocks';
import { createContent } from '../content';
import { login } from '../login';
import { expect, test } from '../test';

test.describe('Infobox Block Acceptance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
    });
    await login(page);
  });

  test('As editor I can add an Infobox block', async ({ page }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const sidebar = page.locator('#sidebar-properties');
    await sidebar.locator('#field-title').fill('Apply now');
    await page
      .locator('.block.infoboxBlock .slate-editor [contenteditable=true]')
      .pressSequentially('Colorless green ideas sleep furiously.');
    await sidebar.locator('#field-buttonText').fill('Open positions');

    await save(page);
    await page.reload();

    const infobox = page.locator('#page-document .block.infoboxBlock');
    await expect(
      infobox.getByRole('heading', { name: 'Apply now' }),
    ).toBeVisible();
    await expect(infobox).toContainText(
      'Colorless green ideas sleep furiously.',
    );
    await expect(infobox.locator('.button')).toHaveText('Open positions');
    await expectNoAccessibilityViolations(page, {
      include: ['#page-document'],
    });
  });

  test('As editor I can add a new paragraph in an Infobox block with Enter', async ({
    page,
  }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const editor = page.locator(
      '.block.infoboxBlock .slate-editor [contenteditable=true]',
    );
    await editor.pressSequentially('First paragraph');
    await editor.press('Enter');
    await editor.pressSequentially('Second paragraph');

    // Enter must stay in the infobox instead of moving to the next block.
    await expect(editor.locator('p')).toHaveCount(2);
    await expect(editor).toContainText('Second paragraph');

    await save(page);
    await page.reload();

    const paragraphs = page.locator(
      '#page-document .block.infoboxBlock .info-text p',
    );
    await expect(paragraphs).toHaveText([
      'First paragraph',
      'Second paragraph',
    ]);
  });

  test('As editor I can align an Infobox block to the right', async ({
    page,
  }) => {
    await page.goto('/document/edit');
    await addBlockFromSlashMenu(page, 'infoboxBlock', 'infobox');

    const sidebar = page.locator('#sidebar-properties');
    await sidebar.locator('#field-title').fill('Aligned');
    // Fieldsets may start expanded; clicking an open one would collapse it.
    const styling = sidebar.locator('.accordion .title', {
      hasText: 'Styling',
    });
    if (!(await styling.evaluate((el) => el.classList.contains('active')))) {
      await styling.click();
    }
    // The align options are visually hidden radios inside their labels.
    await sidebar
      .locator('.field-wrapper-align label')
      .filter({ has: page.locator('input[aria-label="Right"]') })
      .click();

    await save(page);
    await page.reload();

    await expect(page.locator('#page-document .inner.right')).toBeVisible();
  });
});
