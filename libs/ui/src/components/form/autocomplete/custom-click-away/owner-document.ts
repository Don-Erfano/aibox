/**
 * Retrieves the `Document` object from a specified DOM `Node`. This function is particularly useful
 * in scenarios where DOM manipulations need to be context-aware, especially in applications that deal
 * with multiple frames or documents (like in iframes or when working with documents opened via
 * `window.open`).

 * In such cases, direct references to the global `document` object may lead to incorrect or
 * unexpected manipulations, as the global `document` may not correspond to the document in which the
 * node exists. This function ensures that the correct `Document` object is used for DOM operations
 * related to the given node.

 * If the provided node is `null` or `undefined`, or if it does not belong to any `Document`
 * (like a node that has been created but not yet added to the DOM), the function defaults to
 * returning the global `document` object. This makes the function safe for use with nodes that
 * might not be part of the DOM yet, ensuring that DOM-related operations do not fail due to a
 * missing document reference.

 * @param {Node | null | undefined} node - The DOM node for which to find the owner document.
 *                                          Can be `null` or `undefined`.
 * @returns {Document} The `Document` object associated with the given node. If the node is `null`,
 *                     `undefined`, or does not have an associated `Document`, the global `document`
 *                     object is returned.

 * @example
 * // Assuming 'element' is a DOM element within an iframe
 * const doc = ownerDocument(element);
 * // 'doc' will be the document of the iframe, not the parent window

 * @example
 * // For a node that is not yet added to the DOM
 * const newNode = document.createElement('div');
 * const doc = ownerDocument(newNode);
 * // 'doc' will be the global document as 'newNode' is not yet part of the DOM
 */

export default function ownerDocument(node: Node | null | undefined): Document {
  return (node && node.ownerDocument) || document;
}
