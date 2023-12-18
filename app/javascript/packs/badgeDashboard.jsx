import { h, render } from 'preact';
import { BadgeDashboard } from '../badges/BadgeDashboard';

function loadElement() {
  const root = document.getElementById('badges-container');
  if (root) {
    render(<BadgeDashboard />, root);
  }
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
