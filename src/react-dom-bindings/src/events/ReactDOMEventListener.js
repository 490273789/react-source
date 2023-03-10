import {getEventTarget} from './getEventTarget';
import {getClosestInstanceFromNode} from '../client/ReactDOMComponentTree';
import {dispatchEventForPluginEventSystem} from './DOMPluginEventSystem';
/**
 *
 * @param targetContainer
 * @param domEventName
 * @param eventSystemFlags
 * @returns {*}
 */
export function createEventListenerWrapperWithPriority(
  targetContainer,
  domEventName,
  eventSystemFlags
) {
  const listenerWrapper = dispatchDiscreteEvent;
  return listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
}

/**
 * 派发离散事件的监听函数
 * @param domEventName 事件名 click
 * @param eventSystemFlags 阶段 0 冒泡， 4 捕获
 * @param container 容器 div#root
 * @param nativeEvent 原生事件
 */
function dispatchDiscreteEvent(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent
) {
  dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
}

/**
 * 委托给容器的回调，当容器#root在捕获或者说冒泡阶段处理事件的时候回执行此函数
 * @param domEventName
 * @param eventSystemFlags
 * @param container
 * @param nativeEvent
 */
export function dispatchEvent(
  domEventName,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  // 获取事件源，真实的DOM节点
  const nativeEventTarget = getEventTarget(nativeEvent);
  const targetInst = getClosestInstanceFromNode(nativeEventTarget);
  dispatchEventForPluginEventSystem(
    domEventName, // click
    eventSystemFlags, // 0 4
    nativeEvent, // 原生事件
    targetInst, // 真实DOM对应的fiber
    targetContainer // 目标容器
  );
}
