import type { schemaInvoiceDTO } from "@/lib/schemas/schemaItem";
import { useStoreProfile } from "@/store/user";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1 solid #ccc",
    paddingBottom: 10,
    width: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    width: "48%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    padding: 5,
    fontWeight: "bold",
    borderBottom: "1 solid #999",
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottom: "1 solid #eee",
  },
  cell: {
    flex: 1,
  },
  totalBox: {
    alignSelf: "flex-end",
    width: "50%",
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalBold: {
    marginTop: 5,
    borderTop: "1 solid #000",
    fontWeight: "bold",
  },
});
interface PdfProps {
  data: schemaInvoiceDTO;
}

// 2. Create PDF Document Component
export function PdfDocumentPrev({ data }: PdfProps) {
  const { profile } = useStoreProfile();
  const {
    company,
    address,
    date,
    discount,
    discountPrice,
    items,
    originalPrice,
    phoneNumber,
    noInvoice,
  } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.heading}>
          <View>
            <Text>Date : {new Date(date).toLocaleString()}</Text>
            <Text>Invoice Number : {noInvoice} </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Image style={styles.image} src={profile?.image} />
        </View>
        {/* customer dan from info */}
        <View style={styles.grid}>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Customer:
            </Text>
            <Text>Name : {company}</Text>
            <Text>Address : {address}</Text>
            <Text>Phone : {phoneNumber}</Text>
          </View>

          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>From:</Text>
            <Text>{profile?.company}</Text>
            <Text>{profile?.address}</Text>
            <Text>{profile?.phone}</Text>
          </View>
        </View>

        {/* Info Item */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell]}>Product</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Price</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Quantity</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Total</Text>
          </View>

          {/* Table Product */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell]}>{item.product}</Text>
              <Text style={[styles.cell, { textAlign: "right" }]}>
                Rp. {item.price}
              </Text>
              <Text style={[styles.cell, { textAlign: "right" }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cell, { textAlign: "right" }]}>
                Rp. {item.total}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text>Original Price </Text>
            <Text>Rp. {originalPrice}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>{discount}%</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discounted Price</Text>
            <Text>Rp. {discountPrice}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalBold]}>
            <Text>Total</Text>
            <Text>Rp. {discountPrice}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
