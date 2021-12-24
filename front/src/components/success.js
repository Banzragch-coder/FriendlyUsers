import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export default function Success() {
  return (
    <div>
      <br />
      <br />
      {/* <Result
        icon={<SmileOutlined />}
        title="Баярлалаа амжилттай хадгалагдлаа "
        extra={<Button type="primary">.</Button>}
      /> */}
      <Result
        status="success"
        title="Баярлалаа амжилттай хадгалагдлаа "
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat luctus tortor, sed ornare leo dignissim sit amet. Sed ornare sit amet orci a iaculis. "
      />
    </div>
  );
}
