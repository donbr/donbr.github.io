import { render } from '@testing-library/react';
import EventAnalyzer from '../EventAnalyzer';

// Declare mockAnalyze first.
const mockAnalyze = jest.fn();

jest.mock('../../../services/eventAnalyzer', () => ({
  EventAnalyzerService: jest.fn().mockImplementation(() => ({
    analyze: mockAnalyze
  }))
}));

describe('EventAnalyzer', () => {
  it('should call analyze method', () => {
    render(<EventAnalyzer />);
    expect(mockAnalyze).toHaveBeenCalled();
  });
});