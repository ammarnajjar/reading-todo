import { calculateWinner } from './CalculateWinner';

describe('calculateWinner', () => {
  const mockSquares = Array(9).fill(null);
  it('returns null initially', () => {
    expect(calculateWinner(mockSquares)).toBeNull();
  });

  it('returns null for a no win situation', () => {
    const mockNoWin = [['X', 'O', 'X'], ...mockSquares];
    expect(calculateWinner(mockNoWin)).toBeNull();
  });

  it('returns winning square for a win situation', () => {
    const mockWin = ['X', 'X', 'X', ...mockSquares];
    expect(calculateWinner(mockWin)).toEqual('X');
  });
});
