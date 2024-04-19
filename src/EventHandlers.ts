/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  HyperBlastV2LockerContract,
} from "../generated/src/Handlers.gen";

import {
    HyperBlastV2Locker_OnDepositEntity,
    HyperBlastV2Locker_OnWithdrawEntity,
    HyperBlastV2Locker_OwnershipTransferredEntity,
EventsSummaryEntity
} from "../generated/src/Types.gen";

export const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
    hyperBlastV2Locker_OnDepositCount: BigInt(0),
    hyperBlastV2Locker_OnWithdrawCount: BigInt(0),
    hyperBlastV2Locker_OwnershipTransferredCount: BigInt(0),
};

    HyperBlastV2LockerContract.OnDeposit.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    HyperBlastV2LockerContract.OnDeposit.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    hyperBlastV2Locker_OnDepositCount: currentSummaryEntity.hyperBlastV2Locker_OnDepositCount + BigInt(1),
  };

  const hyperBlastV2Locker_OnDepositEntity: HyperBlastV2Locker_OnDepositEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      lpToken: event.params.lpToken      ,
      user: event.params.user      ,
      amount: event.params.amount      ,
      lockDate: event.params.lockDate      ,
      unlockDate: event.params.unlockDate      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.HyperBlastV2Locker_OnDeposit.set(hyperBlastV2Locker_OnDepositEntity);
});
    HyperBlastV2LockerContract.OnWithdraw.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    HyperBlastV2LockerContract.OnWithdraw.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    hyperBlastV2Locker_OnWithdrawCount: currentSummaryEntity.hyperBlastV2Locker_OnWithdrawCount + BigInt(1),
  };

  const hyperBlastV2Locker_OnWithdrawEntity: HyperBlastV2Locker_OnWithdrawEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      lpToken: event.params.lpToken      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.HyperBlastV2Locker_OnWithdraw.set(hyperBlastV2Locker_OnWithdrawEntity);
});
    HyperBlastV2LockerContract.OwnershipTransferred.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    HyperBlastV2LockerContract.OwnershipTransferred.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    hyperBlastV2Locker_OwnershipTransferredCount: currentSummaryEntity.hyperBlastV2Locker_OwnershipTransferredCount + BigInt(1),
  };

  const hyperBlastV2Locker_OwnershipTransferredEntity: HyperBlastV2Locker_OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      previousOwner: event.params.previousOwner      ,
      newOwner: event.params.newOwner      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.HyperBlastV2Locker_OwnershipTransferred.set(hyperBlastV2Locker_OwnershipTransferredEntity);
});
