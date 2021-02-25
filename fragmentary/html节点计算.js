/**
<html>
  <head></head>
  <body>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
    </div>
  </body>
</html>
// 会输出：

{
  totalElementsCount: 7,
  maxDOMTreeDepth: 4,
  maxChildrenCount: 3
}
 */

function getElementInfo() {
  const root = document;
  let totalElementsCount = 0;
  let maxChildrenCount = 0;

  function loop(dom) {
    if (!dom.children || !dom.children.length) return false;

    maxChildrenCount = Math.max(maxChildrenCount, dom.children.length);

    return Math.max(
      ...[...dom.children].map((child) => {
        totalElementsCount++;

        return loop(child) + 1;
      })
    );
  }

  const maxDOMTreeDepth = loop(root);

  return {
    totalElementsCount: totalElementsCount,
    maxDOMTreeDepth: maxDOMTreeDepth,
    maxChildrenCount: maxChildrenCount,
  };
}

getElementInfo();
