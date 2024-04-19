import assert = require("assert")
import { MockDb, HyperBlastV2Locker } from "../generated/src/TestHelpers.gen";
import {
  EventsSummaryEntity,
  HyperBlastV2Locker_OnDepositEntity,
} from "../generated/src/Types.gen";

import { Addresses } from "../generated/src/bindings/Ethers.bs";

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  hyperBlastV2Locker_OnDepositCount: BigInt(0),
  hyperBlastV2Locker_OnWithdrawCount: BigInt(0),
  hyperBlastV2Locker_OwnershipTransferredCount: BigInt(0),
};

describe("HyperBlastV2Locker contract OnDeposit event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock HyperBlastV2Locker contract OnDeposit event
  const mockHyperBlastV2LockerOnDepositEvent = HyperBlastV2Locker.OnDeposit.createMockEvent({
    lpToken: Addresses.defaultAddress,
    user: Addresses.defaultAddress,
    amount: 0n,
    lockDate: 0n,
    unlockDate: 0n,
    mockEventData: {
      chainId: 1,
      blockNumber: 0,
      blockTimestamp: 0,
      blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      srcAddress: Addresses.defaultAddress,
      transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      transactionIndex: 0,
      logIndex: 0,
    },
  });

  // Processing the event
  const mockDbUpdated = HyperBlastV2Locker.OnDeposit.processEvent({
    event: mockHyperBlastV2LockerOnDepositEvent,
    mockDb: mockDbFinal,
  });

  it("HyperBlastV2Locker_OnDepositEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualHyperBlastV2LockerOnDepositEntity = mockDbUpdated.entities.HyperBlastV2Locker_OnDeposit.get(
      mockHyperBlastV2LockerOnDepositEvent.transactionHash +
        mockHyperBlastV2LockerOnDepositEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedHyperBlastV2LockerOnDepositEntity: HyperBlastV2Locker_OnDepositEntity = {
      id:
        mockHyperBlastV2LockerOnDepositEvent.transactionHash +
        mockHyperBlastV2LockerOnDepositEvent.logIndex.toString(),
      lpToken: mockHyperBlastV2LockerOnDepositEvent.params.lpToken,
      user: mockHyperBlastV2LockerOnDepositEvent.params.user,
      amount: mockHyperBlastV2LockerOnDepositEvent.params.amount,
      lockDate: mockHyperBlastV2LockerOnDepositEvent.params.lockDate,
      unlockDate: mockHyperBlastV2LockerOnDepositEvent.params.unlockDate,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualHyperBlastV2LockerOnDepositEntity, expectedHyperBlastV2LockerOnDepositEntity, "Actual HyperBlastV2LockerOnDepositEntity should be the same as the expectedHyperBlastV2LockerOnDepositEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      hyperBlastV2Locker_OnDepositCount: MOCK_EVENTS_SUMMARY_ENTITY.hyperBlastV2Locker_OnDepositCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual HyperBlastV2LockerOnDepositEntity should be the same as the expectedHyperBlastV2LockerOnDepositEntity");
  });
});
