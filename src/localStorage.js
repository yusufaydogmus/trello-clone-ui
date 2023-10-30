export function saveActiveBoardId(boardId) {
    localStorage.setItem('activeBoardId', boardId);
  }
  
  export function getActiveBoardId() {
    return localStorage.getItem('activeBoardId');
  }
  
  export function clearActiveBoardId() {
    localStorage.removeItem('activeBoardId');
  }
  