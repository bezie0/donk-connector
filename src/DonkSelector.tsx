import React, { CSSProperties, useEffect, useMemo } from "react";
import { useVirtual } from "react-virtual";
import { useSelect } from "downshift";

import { buildCDNImageURL } from "./utils";
import { useDonkConnector } from "./DonkConnectorContext";
import EmptyState from "./EmptyState";
import { useWallet } from "@solana/wallet-adapter-react";

interface DonkSelectorProps {
  items: string[];
}

const menuStyles = {
  backgroundColor: "#eee",
  padding: 0,
  listStyle: "none",
  maxHeight: 50 * 5,
  width: 300,
  overflowY: "scroll",
  position: "absolute",
  left: 100,
  zIndex: 999,
  borderRadius: 5,
} as CSSProperties;

const DonkSelector: React.FC<DonkSelectorProps> = ({ items }) => {
  const { mint: selectedMint, setMint, donks, mints } = useDonkConnector();
  const numMints = mints.length;
  const wallet = useWallet();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: React.useCallback(() => 50, []),
    overscan: 5,
  });

  const {
    getItemProps,
    getMenuProps,
    highlightedIndex,
    selectedItem,
    getToggleButtonProps,
    isOpen,
    selectItem,
  } = useSelect({
    items,
    scrollIntoView: () => {},
    selectedItem: selectedMint,
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      typeof highlightedIndex === "number" &&
      rowVirtualizer.scrollToIndex(highlightedIndex),
    onSelectedItemChange: ({ selectedItem }) =>
      typeof selectedItem === "string" && setMint(selectedItem),
  });

  const selectedImage = useMemo(() => {
    if (!selectedMint) return;
    const [, arweaveId] = donks[selectedMint];
    return buildCDNImageURL(arweaveId);
  }, [selectedMint]);

  useEffect(() => {
    if (!selectedMint && selectedItem) {
      selectItem("");
    }
  }, [selectedMint]);

  if (!wallet.publicKey) return null;
  if (numMints < 1) return <EmptyState />;

  return (
    <div style={{ maxWidth: 300, margin: "auto", position: "relative" }}>
      {selectedImage && (
        <button
          type="button"
          {...getToggleButtonProps()}
          style={{ cursor: numMints > 1 ? "pointer" : "default" }}
        >
          <img
            src={selectedImage}
            style={{
              borderRadius: "50%",
            }}
          />
        </button>
      )}

      {isOpen && (
        <ul
          {...getMenuProps({
            ref: parentRef,
            style: menuStyles,
          })}
        >
          <li key="total-size" style={{ height: rowVirtualizer.totalSize }} />
          {rowVirtualizer.virtualItems.map((virtualRow: any) => {
            const mint = items[virtualRow.index];
            const [id, arweaveId] = donks[mint];

            return (
              <li
                key={id}
                {...getItemProps({
                  index: virtualRow.index,
                  item: items[virtualRow.index],
                  style: {
                    backgroundColor:
                      highlightedIndex === virtualRow.index
                        ? "lightgray"
                        : "inherit",
                    fontWeight:
                      selectedItem && donks[selectedItem][0] === id
                        ? "bold"
                        : "normal",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    cursor: "pointer",
                  },
                })}
              >
                <img
                  loading="lazy"
                  src={buildCDNImageURL(arweaveId, 100)}
                  height={50}
                  width={50}
                  style={{ marginRight: 10 }}
                />
                <span>Flunk Donkey #{id}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DonkSelector;
