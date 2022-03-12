import React from 'react';
import clsx from 'clsx';
import { LeftMenu } from '../components/LeftMenu';


interface MainLayoutProps {
    hideComments?: boolean;
    hideMenu?: boolean;
  contentFullWidth?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  contentFullWidth,

  hideMenu,
  className,
}) => {
  return (
    <div className={clsx('wrapper', className)}>
        {!hideMenu &&
            <div className="leftSide">
                <LeftMenu/>
            </div>
        }
      <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
    
    </div>
  );
};
