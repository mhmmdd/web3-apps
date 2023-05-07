import {useWeb3} from "@/components/providers/web3";
import Link from "next/link";
import Button from "@/components/ui/common/button";
import {useAccount} from "@/components/web3/hooks/useAccount";

export default function Navbar() {
  const {connect, isLoading, isWeb3Enabled} = useWeb3();
  const {account} = useAccount();

  return (
    <section>
      {account}
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">Product</span>
              </Link>
              <Link href="/">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">Features</span>
              </Link>
              <Link href="/">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</span>
              </Link>
            </div>
            <div>
              <Link href="/">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</span>
              </Link>
              {
                isLoading
                  ?
                  <Button onClick={connect} disabled>
                    Loading...
                  </Button> :
                  (
                    isWeb3Enabled ?
                      <Button onClick={connect}>
                        Connect
                      </Button>
                      :
                      <Button onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                        Install Metamask
                      </Button>
                  )
              }
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}
