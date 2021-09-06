import fetch from 'node-fetch';

export class ReverseGeocoding {
    async getAddress(lat: number, long: number) {
        const address = await fetch(`https://map.ir/reverse/?lat=${lat}&lon=${long}`, {
            headers: { 'x-api-key': process.env.MAPIR_API_TOKEN },
        }).then(res => res.json());

        return address.address_compact;
    }
}