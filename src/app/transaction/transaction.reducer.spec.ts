import { transactionReducer, initialTransactionState } from './transaction.reducer';

describe('Transaction Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = transactionReducer(initialTransactionState, action);

      expect(result).toBe(initialTransactionState);
    });
  });
});
