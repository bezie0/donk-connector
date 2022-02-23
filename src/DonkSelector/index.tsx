import React, { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useVirtual } from "react-virtual";
import { usePopper } from "react-popper";

import { buildCDNImageURL } from "../utils";
import { useDonkConnector } from "../DonkConnectorContext";
import {
  PopperContainer,
  AvatarButton,
  VirtualizedListContainer,
  ListContainer,
  ListItem,
} from "./styles";
import EmptyState from "./EmptyState";
import avatar from "../images/avatar.png";
import { useClickOutside } from "../hooks/useOutsideClick";

interface DonkSelectorProps {
  items: string[];
}

const DonkSelector: React.FC<DonkSelectorProps> = ({ items }) => {
  const { mint: selectedMint, setMint, donks, mints } = useDonkConnector();
  const [isVisible, setIsVisible] = useState(false);
  const numMints = mints.length;
  const wallet = useWallet();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef(null);
  const popperRef = React.useRef(null);
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: React.useCallback(() => 50, []),
    overscan: 5,
  });

  useClickOutside([popperRef, buttonRef], isVisible, () => setIsVisible(false));

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef,
          },
        },
      ],
    }
  );

  const selectedImage = useMemo(() => {
    if (!selectedMint) return;
    const [, arweaveId] = donks[selectedMint];
    return buildCDNImageURL(arweaveId);
  }, [selectedMint]);

  if (!wallet.publicKey) return null;

  return (
    <>
      <AvatarButton
        type="button"
        ref={buttonRef}
        onClick={() => setIsVisible(true)}
      >
        <img src={selectedImage || avatar} />
        <span>&#9660;</span>
      </AvatarButton>
      {isVisible && (
        <PopperContainer
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={setArrowRef} style={styles.arrow} className="arrow" />
          <ListContainer ref={parentRef}>
            <VirtualizedListContainer height={`${rowVirtualizer.totalSize}px`}>
              {numMints > 0 ? (
                rowVirtualizer.virtualItems.map((virtualRow: any) => {
                  const mint = items[virtualRow.index];
                  const [id, arweaveId] = donks[mint];

                  return (
                    <ListItem
                      key={id}
                      onClick={() => {
                        setIsVisible(false);
                        setMint(mint);
                      }}
                      height={`${virtualRow.size}px`}
                      transform={`translateY(${virtualRow.start}px)`}
                      selected={selectedMint === mint}
                    >
                      <img
                        loading="lazy"
                        src={buildCDNImageURL(arweaveId, 100)}
                      />
                      <span>Flunk Donkey #{id}</span>
                    </ListItem>
                  );
                })
              ) : (
                <EmptyState />
              )}
            </VirtualizedListContainer>
          </ListContainer>
        </PopperContainer>
      )}
    </>
  );
};

export default DonkSelector;
