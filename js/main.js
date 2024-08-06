import UIService from './UIService.js';
import { loadTestData } from './test.js';

// Initialize
loadTestData()
UIService.displayClassesList();
UIService.initAddClassModal();
