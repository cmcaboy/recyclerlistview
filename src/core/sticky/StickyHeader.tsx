/**
 * Created by ananya.chandra on 20/09/18.
 */

import StickyObject, {StickyObjectProps, StickyObjectState, StickyType, VisibleIndices} from "./StickyObject";

export default class StickyHeader<P extends StickyObjectProps, S extends StickyObjectState> extends StickyObject<P, S> {
    constructor(props: P, context?: any) {
        super(props, context);
    }

    protected initStickyParams(): void {
        this.stickyType = StickyType.HEADER;
        this.stickyTypeMultiplier = 1;
        this.containerPosition = {top: 0};
    }

    protected isInitiallyVisible(
        visibleIndices: VisibleIndices, stickyIndices: number[], currentIndice: number, smallestVisibleIndex: number, largestVisibleIndex: number,
    ): void {
        //TODO Ananya: Handle recycler scrollTo case
        if (smallestVisibleIndex < stickyIndices[0]) {
            this.initialVisibility = false;
        } else {
            this.initialVisibility = true;
            let i: number = 0;
            let resolved: boolean = false;
            let lastIndex: number = -1;
            for (const index of stickyIndices) {
                if (smallestVisibleIndex < index) {
                    this.currentIndice = i - 1;
                    this.currentStickyIndice = lastIndex;
                    resolved = true;
                    break;
                }
                i++;
                lastIndex = index;
            }
            if (!resolved) {
                this.currentIndice = i - 1;
                this.currentStickyIndice = lastIndex;
            }
        }
    }

    protected getNextYd(nextY: number, nextHeight: number): number {
        return nextY;
    }

    protected getCurrentYd(currentY: number, currentHeight: number): number {
        return currentY;
    }

    protected getScrollY(offsetY: number, scrollableHeight: number): number | null {
        return offsetY;
    }
}
