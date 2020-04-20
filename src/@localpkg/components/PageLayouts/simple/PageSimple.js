import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import {FuseScrollbars} from '@localpkg';
import clsx from 'clsx';
import FusePageSimpleSidebar from './FusePageSimpleSidebar';
import FusePageSimpleHeader from './FusePageSimpleHeader';
import * as PropTypes from 'prop-types';

const headerHeight = 120;
const toolbarHeight = 64;
const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
    root                     : {
        display        : 'flex',
        flexDirection  : 'column',
        minHeight      : '100%',
        position       : 'relative',
        flex           : '1 0 auto',
        height         : 'auto',
        backgroundColor: theme.palette.background.default
    },
    innerScroll              : {
        flex  : '1 1 auto',
        height: '100%'
    },
    wrapper                  : {
        display        : 'flex',
        flexDirection  : 'row',
        flex           : '1 1 auto',
        zIndex         : 2,
        maxWidth       : '100%',
        minWidth       : 0,
        height         : '100%',
        backgroundColor: theme.palette.background.default
    },
    /* contentCardWrapper            : {
         display : 'flex ',
         flex    : '1 1 auto',
         overflow: 'visible!important',
         minWidth: 0,
         '&.ps'  : {
             overflow: 'visible!important'
         }
     },
     contentCardWrapperInnerSidebar: {
         display                     : 'block',
         overflow                    : 'auto!important',
         '-webkit-overflow-scrolling': 'touch',
         '&.ps'                      : {
             overflow: 'hidden!important'
         },
         '& $contentCard'            : {
             borderRadius: 8
         }
     },*/
    contentWrapper           : {
        display                     : 'flex',
        flexDirection               : 'column',
        flex                        : '1 1 auto',
        overflow                    : 'auto',
        '-webkit-overflow-scrolling': 'touch',
        zIndex                      : 9999
    },
    toolbar                  : {
        height    : toolbarHeight,
        minHeight : toolbarHeight,
        display   : 'flex',
        alignItems: 'center'
    },
    content                  : {
        flex: '1 0 auto'
    },
    sidebarWrapper           : {
        overflow       : 'hidden',
        backgroundColor: 'transparent',
        position       : 'absolute',
        '&.permanent'  : {
            [theme.breakpoints.up('lg')]: {
                position: 'relative'
            }
        }
    },
    sidebar                  : {
        position     : 'absolute',
        '&.permanent': {
            [theme.breakpoints.up('lg')]: {
                backgroundColor: theme.palette.background.default,
                color          : theme.palette.text.primary,
                position       : 'relative',
                paddingLeft    : 30,
                paddingRight   : 25,
            }
        },
        width        : drawerWidth,
        height       : '100%'
    },
    leftSidebar              : {
        [theme.breakpoints.up('lg')]: {
            borderRight: '1px solid ' + theme.palette.divider,
            borderLeft : 0
        }
    },
    rightSidebar             : {
        [theme.breakpoints.up('lg')]: {
            // borderLeft : '1px solid ' + theme.palette.divider,
            borderRight: 0,
        }
    },
    sidebarHeader            : {
        height         : headerHeight,
        minHeight      : headerHeight,
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.primary.contrastText
    },
    sidebarHeaderInnerSidebar: {
        backgroundColor: 'transparent',
        color          : 'inherit',
        height         : 'auto',
        minHeight      : 'auto'
    },
    sidebarContent           : {},
    backdrop                 : {
        position: 'absolute'
    }
}));

const FusePageSimple = React.forwardRef(function (props, ref) {
    // console.info("render::FusePageSimple");
    const leftSidebarRef = useRef(null);
    const rightSidebarRef = useRef(null);
    const rootRef = useRef(null);
    const classes = useStyles(props);

    React.useImperativeHandle(ref, () => {
        return {
            rootRef           : rootRef,
            toggleLeftSidebar : () => {
                leftSidebarRef.current.toggleSidebar()
            },
            toggleRightSidebar: () => {
                rightSidebarRef.current.toggleSidebar()
            }
        }
    });

    return (
        <div className={clsx(classes.root, props.innerScroll && classes.innerScroll)} ref={rootRef}>



            <div className="flex flex-auto flex-col container z-1">

                {props.header && props.sidebarInner && (
                    <FusePageSimpleHeader header={props.header} classes={classes}/>
                )}

                {props.featuredContents && (
                  props.featuredContents
                )}

                <div className={classes.wrapper}>

                    {(props.leftSidebarHeader || props.leftSidebarContent) && (
                        <FusePageSimpleSidebar
                            position="left"
                            header={props.leftSidebarHeader}
                            content={props.leftSidebarContent}
                            variant={props.leftSidebarVariant || 'permanent'}
                            innerScroll={props.innerScroll}
                            sidebarInner={props.sidebarInner}
                            classes={classes}
                            ref={leftSidebarRef}
                            rootRef={rootRef}
                        />
                    )}

                    {/*<FuseScrollbars*/}
                    {/*    className={clsx(classes.contentCardWrapper, props.sidebarInner && classes.contentCardWrapperInnerSidebar)}*/}
                    {/*    enable={props.innerScroll && props.sidebarInner}*/}
                    {/*>*/}
                    <FuseScrollbars className={classes.contentWrapper} enable={props.innerScroll && !props.sidebarInner}>

                        {props.header && !props.sidebarInner && (
                            <FusePageSimpleHeader header={props.header} classes={classes}/>
                        )}

                        {props.contentToolbar && (
                            <div className={classes.toolbar}>
                                {props.contentToolbar}
                            </div>
                        )}

                        {props.content && (
                            <div className={classes.content}>
                                {props.content}
                            </div>
                        )}
                    </FuseScrollbars>
                    {/*</FuseScrollbars>*/}

                    {(props.rightSidebarHeader || props.rightSidebarContent) && (
                        <FusePageSimpleSidebar
                            position="right"
                            header={props.rightSidebarHeader}
                            content={props.rightSidebarContent}
                            variant={props.rightSidebarVariant || 'permanent'}
                            innerScroll={props.innerScroll}
                            sidebarInner={props.sidebarInner}
                            classes={classes}
                            ref={rightSidebarRef}
                            rootRef={rootRef}
                        />
                    )}

                </div>
            </div>
        </div>
    );
});

FusePageSimple.propTypes = {
    leftSidebarHeader  : PropTypes.node,
    leftSidebarContent : PropTypes.node,
    leftSidebarVariant : PropTypes.node,
    rightSidebarHeader : PropTypes.node,
    rightSidebarContent: PropTypes.node,
    rightSidebarVariant: PropTypes.node,
    header             : PropTypes.node,
    content            : PropTypes.node,
    contentToolbar     : PropTypes.node,
    sidebarInner       : PropTypes.bool,
    innerScroll        : PropTypes.bool
};

FusePageSimple.defaultProps = {

};

export default React.memo(FusePageSimple);