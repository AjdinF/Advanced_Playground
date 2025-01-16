import { describe, it, expect, beforeEach } from 'vitest';
import { setupCounter } from './counter';
import { JSDOM } from 'jsdom';

describe('setupCounter', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {

    const dom = new JSDOM('<!DOCTYPE html><html><body><button></button></body></html>');
    global.document = dom.window.document;
    button = document.querySelector('button') as HTMLButtonElement;

    setupCounter(button);
  });

  it('should initialize the counter to 0', () => {
    expect(button.innerHTML).toBe('count is 0');
  });

  it('should increment the counter when clicked', () => {
    button.click();
    expect(button.innerHTML).toBe('count is 1');
    
    button.click();
    expect(button.innerHTML).toBe('count is 2');
  });
});
