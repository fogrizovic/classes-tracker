import UIService from './UIService.js';
import ModalService from './ModalService.js';
import { loadTestData } from './test.js';

// Initialize
loadTestData()
UIService.displayClassesList();
ModalService.initModal();
