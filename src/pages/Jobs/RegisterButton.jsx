import { Link } from "react-router";
import { Button } from "../../components/ui/jobs/button";


export default function RegisterButton() {
    return (
        <div>
            <Link to="/jobs/new" className="block mt-[10px]">
                <Button
                    variant="outline"
                    className="w-full rounded-md bg-blue-100 hover:bg-blue-300">
                    등록하기
                </Button>
            </Link>
        </div>
    );
}
