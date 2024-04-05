import {
  FaDiscord,
  FaGithub,
  FaMedium,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Separator } from "./ui/separator"

export default function Partners() {
  return (
    <section className="container grid items-center gap-6 pb-8 mt-20 md:py-10  ">
      <div className="flex flex-col items-start justify-center align-middle gap-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl pb-4 ">
          Decentralized AI Ecosystem
        </h1>
      </div>
      <Separator />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Community & User Front Ends
        </h1>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard1 />
        <ProjectCard2 />
        <ProjectCard3 />
        <ProjectCard4 />
      </div>
      <div />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Models
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard5 />
        <ProjectCard6 />
        <ProjectCard7 />
        <ProjectCard8 />
        <ProjectCard9 />
      </div>
      <div />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Computation for Training
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard10 />
        <ProjectCard11 />
        <ProjectCard12 />
      </div>
      <div />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Smart Contracts
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard13 />
        <ProjectCard14 />
        <ProjectCard15 />
        <ProjectCard1 />
        <ProjectCard16 />
      </div>
      <div />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Inference
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard17 />
        <ProjectCard6 />
        <ProjectCard18 />
        <ProjectCard11 />
        <ProjectCard19 />
      </div>
      <div />
      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Tools
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard20 />
        <ProjectCard5 />
        <ProjectCard21 />
        <ProjectCard22 />
      </div>
      <div />

      <div className="flex items-center justify-start align-middle pt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-2xl pb-4 ">
          Data
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 grid grid-row-5 sm:grid-cols-2 gap-4">
        <ProjectCard23 />
        <ProjectCard24 />
        <ProjectCard25 />
        <ProjectCard16 />
      </div>
      <div />
    </section>
  )
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({
  href,
  icon,
}) => (
  <a target="_blank" rel="noreferrer" href={href}>
    {icon}
  </a>
)

const ProjectCard: React.FC<{
  title: string
  description: string
  website: string
  src: string
  tg: string
  twt: string
  git: string
  discord: string
}> = ({ title, description, website, src, tg, twt, git, discord }) => {
  return (
    <div className="group relative transition-all hover:-translate-y-1">
      <a title={title}>
        <div className="flex flex-col items-start justify-center rounded-2xl border-2 dark:border-[#162036] dark:group-hover:border-[#1e2c4d] dark:bg-[#111827] bg-white p-4 pb-14">
          <div className="relative overflow-hidden transition ease-in-out rounded-full border-2 h-[60px] w-[60px]">
            <img
              alt={title}
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
              src={src}
            />
          </div>
          <div className="mt-4 line-clamp-1 font-medium">{title}</div>
          <div className="mt-2 line-clamp-2 h-8 text-xs dark:text-gray-400 text-black/65">
            {description}
          </div>
        </div>
      </a>
      <div className="absolute bottom-0 flex w-full items-center justify-between rounded-b-2xl border-2 border-transparent dark:bg-black/25 bg-gray-800/20 bg-clip-padding px-4 pb-3 pt-2.5">
        <div className="flex items-center space-x-2">
          {twt ? (
            <SocialLink href={twt} icon={<FaTwitter />} />
          ) : (
            <FaTwitter className="brightness-50 opacity-50 dark:opacity-100" />
          )}
          {git ? (
            <SocialLink href={git} icon={<FaGithub />} />
          ) : (
            <FaGithub className="brightness-50 opacity-50 dark:opacity-100" />
          )}
          {discord ? (
            <SocialLink href={discord} icon={<FaDiscord />} />
          ) : (
            <FaDiscord className="brightness-50 opacity-50 dark:opacity-100" />
          )}
          {tg ? (
            <SocialLink href={tg} icon={<FaTelegram />} />
          ) : (
            <FaTelegram className="brightness-50 opacity-50 dark:opacity-100" />
          )}
        </div>
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-downtown-blue/50 px-2.5 py-1 text-xs dark:text-slate-300 text-black hover:bg-downtown-blue hover:text-white"
          title={title}
        >
          Website
        </a>
      </div>
    </div>
  )
}

// REPLACE DISC HOSTED IMAGES
const ProjectCard1: React.FC = () => (
  <ProjectCard
    title="Morpheus"
    description="Morpheus is the peer-to-peer network for generative AI. Permissionless and open-source."
    website="https://mor.org/"
    src="/morpheus_icon.png"
    tg=""
    twt="https://twitter.com/MorpheusAIs"
    discord="https://discord.gg/Dc26EFb6JK"
    git="https://github.com/MorpheusAIs"
  />
)

const ProjectCard2: React.FC = () => (
  <ProjectCard
    title="Frostbyte"
    description="FrostByte enables anyone to secure anything. Create multiple Vaults for you and your team, and even enable dynamic security for different personnel across your organization."
    website="https://www.frostbyte.app/"
    src="/frostbyte_icon.png"
    twt="https://twitter.com/frostbyteapp"
    discord="https://discord.gg/frostbyte"
    git=""
    tg="https://t.me/frostbyte_announcements"
  />
)

const ProjectCard3: React.FC = () => (
  <ProjectCard
    title="Rainfall"
    description="Rainfall is a decentralized, privacy-preserving personal intelligence platform."
    website="https://rainfall.one"
    src="/rainfall_icon.png"
    twt="https://twitter.com/rainfall_one"
    discord=""
    git=""
    tg=""
  />
)

const ProjectCard4: React.FC = () => (
  <ProjectCard
    title="Automatic1111"
    description="Automatic1111 is a data scientist working on LLMs and AI frontends."
    website=""
    src="/automatic1111_icon.png"
    twt=""
    discord=""
    git="https://github.com/AUTOMATIC1111"
    tg=""
  />
)

const ProjectCard5: React.FC = () => (
  <ProjectCard
    title="LlamaIndex"
    description="Rainfall is a decentralized, privacy-preserving personal intelligence platform."
    website="https://www.llamaindex.ai/"
    src="/llamaindex_icon.png"
    twt="https://twitter.com/llama_index"
    discord=""
    git="https://github.com/run-llama/llama_index"
    tg=""
  />
)

const ProjectCard6: React.FC = () => (
  <ProjectCard
    title="Arkeo"
    description="Arkeo was created to provide decentralized applications with increased development velocity, censorship-resistance, and most importantly to be a needed tool in fully decentralizing the UI layer of the web3 stack."
    website="https://arkeo.network/"
    src="/arkeo_icon.png"
    twt="https://twitter.com/arkeonetwork"
    discord="https://discord.gg/BfEHpm6uFc"
    git="https://github.com/arkeonetwork"
    tg=""
  />
)

const ProjectCard7: React.FC = () => (
  <ProjectCard
    title="Hugging Face"
    description="Hugging Face is on a mission to democratize good machine learning, one commit at a time."
    website="https://huggingface.co/"
    src="/huggingface_icon.png"
    twt="https://twitter.com/huggingface"
    discord="https://huggingface.co/join/discord"
    git="https://github.com/huggingface"
    tg=""
  />
)

const ProjectCard8: React.FC = () => (
  <ProjectCard
    title="Nous Research"
    description="At Nous Research, we are dedicated to advancing the field of machine learning through cutting-edge research and development."
    website="https://nousresearch.com/"
    src="/nous_icon.png"
    twt="https://twitter.com/nousresearch"
    discord="https://discord.gg/jqVphNsB4H"
    git=""
    tg=""
  />
)

const ProjectCard9: React.FC = () => (
  <ProjectCard
    title="Stability.ai"
    description="Stability provides Open models in every modality, for everyone, everywhere."
    website="https://stability.ai/"
    src="/stability.ai_icon.png"
    twt="https://twitter.com/StabilityAI"
    discord="https://discord.gg/stablediffusion"
    git=""
    tg=""
  />
)

const ProjectCard10: React.FC = () => (
  <ProjectCard
    title="Bittensor"
    description="Bittensor's vision for a decentralized AI company has captivated a large number of people in the arenas of Artificial Intelligence and computer science, who have yearned for an alternative to the top-down world being created by our current technology giants."
    website="https://bittensor.com/"
    src="/bittensor_icon.png"
    twt="https://twitter.com/bittensor_"
    discord="https://discord.gg/qasY3HA9F9"
    git="https://github.com/opentensor"
    tg=""
  />
)

const ProjectCard11: React.FC = () => (
  <ProjectCard
    title="Akash"
    description="Akash is an open network that lets users buy and sell computing resources securely and efficiently. Purpose-built for public utility."
    website="https://akash.network/"
    src="/akash_icon.png"
    twt="https://twitter.com/akashnet_"
    discord="https://discord.com/invite/akash"
    git="https://github.com/akash-network"
    tg=""
  />
)

const ProjectCard12: React.FC = () => (
  <ProjectCard
    title="Render Network"
    description="The Render Network® Provides Near Unlimited Decentralized GPU Computing Power For Next Generation 3D Content Creation."
    website="https://rendernetwork.com/"
    src="/render_icon.png"
    twt="https://twitter.com/rendernetwork"
    discord="https://discord.gg/rendernetwork"
    git=""
    tg="https://t.me/rendernetwork"
  />
)

const ProjectCard13: React.FC = () => (
  <ProjectCard
    title="Ethereum"
    description="Ethereum is a decentralized blockchain platform that establishes a peer-to-peer network that securely executes and verifies application code, called smart contracts."
    website="https://ethereum.foundation/"
    src="/ethereum_icon.png"
    twt="https://twitter.com/ethereum"
    discord=""
    git=""
    tg=""
  />
)

const ProjectCard14: React.FC = () => (
  <ProjectCard
    title="Arbitrum"
    description="Arbitrum is shaping the future of Ethereum. Arbitrum technology makes it possible for projects to leverage Ethereum's security to build next-gen apps."
    website="https://arbitrum.io/"
    src="/arbitrum_icon.png"
    twt="https://twitter.com/arbitrum"
    discord="https://discord.gg/arbitrum"
    git=""
    tg=""
  />
)

const ProjectCard15: React.FC = () => (
  <ProjectCard
    title="Polygon"
    description="Polygon enables an infinitely scalable web of sovereign blockchains that feels like a single chain. Powered by ZK tech."
    website="https://polygon.technology/"
    src="/polygon_icon.png"
    twt="https://twitter.com/0xPolygon"
    discord="https://discord.com/invite/0xPolygon"
    git="https://github.com/maticnetwork/"
    tg="https://t.me/polygonofficial"
  />
)

const ProjectCard16: React.FC = () => (
  <ProjectCard
    title="Syntropy"
    description="Syntropy is building an on-chain streaming oracle, providing a decentralized and scalable way to access, retrieve, and interact with real-time blockchain data."
    website="https://www.syntropynet.com/"
    src="/syntropy_icon.png"
    twt="https://twitter.com/Syntropynet"
    discord="https://discord.gg/Ze7Kswye8B"
    git="https://github.com/SyntropyNet"
    tg="https://t.me/SyntropyNet"
  />
)

const ProjectCard17: React.FC = () => (
  <ProjectCard
    title="Edgellama"
    description="An Open Standard for Decentralized AI."
    website="https://hyperspace.computer/"
    src="/edgellama_icon.png"
    twt="https://twitter.com/HyperspaceAI"
    discord=""
    git=""
    tg="https://t.me/edgellama"
  />
)

const ProjectCard18: React.FC = () => (
  <ProjectCard
    title="Ritual"
    description="Ritual allows you to Seamlessly integrate AI into your app or protocol on any chain, enabling you to fine-tune, monetize, and perform inference on models using cryptographic schemes."
    website="https://ritual.net/"
    src="/ritual_icon.png"
    twt="https://twitter.com/ritualnet"
    discord=""
    git="https://github.com/ritual-net"
    tg=""
  />
)

const ProjectCard19: React.FC = () => (
  <ProjectCard
    title="Livepeer"
    description="Launched in 2017, Livepeer is the first live video streaming network protocol that is fully decentralized."
    website="https://livepeer.org/"
    src="/livepeer_icon.png"
    twt="https://twitter.com/Livepeer"
    discord="https://discord.gg/livepeer"
    git=""
    tg="https://t.me/livepeerorg"
  />
)

const ProjectCard20: React.FC = () => (
  <ProjectCard
    title="LangChain"
    description="
    LangChain gives developers a framework to construct LLM-powered apps easily."
    website="https://www.langchain.com/"
    src="/langchain_icon.png"
    twt="https://twitter.com/LangChainAI"
    discord="https://discord.com/invite/6adMQxSpJS"
    git=""
    tg="https://github.com/langchain-ai"
  />
)

const ProjectCard21: React.FC = () => (
  <ProjectCard
    title="ollama"
    description="Ollama allows you to run large language models, locally."
    website="https://ollama.com/"
    src="/ollama_icon.png"
    twt="https://twitter.com/ollama"
    discord="https://discord.com/invite/ollama"
    git="https://github.com/ollama"
    tg=""
  />
)

const ProjectCard22: React.FC = () => (
  <ProjectCard
    title="Electron"
    description="Electron allows you to build cross-platform desktop apps with JavaScript, HTML, and CSS"
    website="https://www.electronjs.org/"
    src="/electron_icon.png"
    twt="https://twitter.com/electronjs"
    discord="https://discordapp.com/invite/APGC3k5yaH"
    git="https://github.com/electron/electron"
    tg=""
  />
)

const ProjectCard23: React.FC = () => (
  <ProjectCard
    title="Filecoin"
    description="Filecoin is an open-source, public cryptocurrency and digital payment system intended to be a blockchain-based cooperative digital storage and data retrieval method.."
    website="https://filecoin.io/"
    src="/filecoin_icon.png"
    twt="https://twitter.com/Filecoin"
    discord=""
    git="https://github.com/filecoin-project"
    tg="https://t.me/filecoin"
  />
)

const ProjectCard24: React.FC = () => (
  <ProjectCard
    title="IPFS"
    description="The InterPlanetary File System is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system."
    website="https://ipfs.tech/"
    src="/ipfs_icon.png"
    twt="https://twitter.com/ipfs"
    discord=""
    git="https://github.com/ipfs"
    tg=""
  />
)

const ProjectCard25: React.FC = () => (
  <ProjectCard
    title="Jackal Protocol"
    description="Built as an application specific blockchain, Jackal is purpose with custom blockchain modules for on-chain data permissions, ownership, transfer, encryption, and more. "
    website="https://www.jackalprotocol.com/"
    src="/jackal_icon.png"
    twt="https://twitter.com/Jackal_Protocol"
    discord="https://discord.com/invite/5GKym3p6rj"
    git="https://github.com/JackalLabs/canine-chain"
    tg="https://t.me/+rtuZnbTlHaIzNjVh"
  />
)
