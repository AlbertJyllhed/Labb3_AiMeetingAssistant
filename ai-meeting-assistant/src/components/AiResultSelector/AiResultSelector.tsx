import type { AiResult } from "../../types/types";

import SummaryCard from "../SummaryCard/SummaryCard";
import AgendaCard from "../AgendaCard/AgendaCard";
import InviteCard from "../InviteCard/InviteCard";

export default function AiResultSelector({ result }: { result: AiResult }) {
    switch (result.kind) {
        case "summary":
            return <SummaryCard data={result.data} />;
        case "agenda":
            return <AgendaCard data={result.data} />;
        case "invite":
            return <InviteCard data={result.data} />;
    }
}
