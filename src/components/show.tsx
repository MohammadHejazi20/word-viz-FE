import React, { Children, ReactNode, ReactElement } from "react";

type ShowProps = {
  children: ReactNode;
};

type WhenProps = {
  isTrue: boolean;
  children: ReactNode;
};

type ElseProps = {
  render?: ReactNode;
  children?: ReactNode;
};

const Show: React.FC<ShowProps> & {
  When: React.FC<WhenProps>;
  Else: React.FC<ElseProps>;
} = ({ children }) => {
  const renderChild = (child: ReactNode): ReactNode | null => {
    if (!React.isValidElement(child)) return null;

    const element = child as ReactElement<WhenProps | ElseProps>; // Narrow down to ReactElement with specific props

    if ("isTrue" in element.props && element.props.isTrue === true) {
      return element.props.children;
    }

    if (!("isTrue" in element.props)) {
      return element.props.render ?? element.props.children;
    }

    return null;
  };

  return (
    (Children.map(children, renderChild) as ReactNode[]).find(Boolean) ?? null
  );
};

/**
 * Conditionally renders children when isTrue is true
 */
Show.When = ({ isTrue, children }: WhenProps) => (isTrue ? children : null);
Show.When.displayName = "Show.When";

/**
 * Renders either the render prop or children when shown
 */
Show.Else = ({ render, children }: ElseProps) => render ?? children;

export default Show;
